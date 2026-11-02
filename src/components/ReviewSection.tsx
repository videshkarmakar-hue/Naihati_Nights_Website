import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  MessageSquare,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  ThumbsUp,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db, loginWithGoogle, logoutUser } from '../lib/firebase';
import { Review, ReviewStats } from '../types';
import { APP_CONFIG } from '../data/config';

// Official Google G Logo SVG
const GoogleGLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// Format relative timestamps safely
function formatRelativeTime(timestamp: { seconds: number; nanoseconds: number } | null | undefined): string {
  if (!timestamp || !timestamp.seconds) return 'Just now';

  const now = Date.now();
  const date = new Date(timestamp.seconds * 1000);
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins} minute${mins > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 172800) return 'Yesterday';
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Generate initials avatar
function getInitials(name: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}

export const ReviewSection: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Firestore Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  // Sorting and Pagination
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Review Form Modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState<string>(() => {
    try {
      return localStorage.getItem('traveler_name') || '';
    } catch {
      return '';
    }
  });
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Local storage tracking for reviews posted from this device
  const [myReviewIds, setMyReviewIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('traveler_my_reviews') || '[]');
    } catch {
      return [];
    }
  });

  const [visitorId] = useState<string>(() => {
    try {
      let id = localStorage.getItem('traveler_visitor_id');
      if (!id) {
        id = 'guest_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
        localStorage.setItem('traveler_visitor_id', id);
      }
      return id;
    } catch {
      return 'guest_' + Date.now();
    }
  });

  // Delete Confirmation Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Subscribe to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
      if (user?.displayName && !nameInput) {
        setNameInput(user.displayName);
      }
    });
    return () => unsubscribe();
  }, [nameInput]);

  // Real-time Firestore subscription to published reviews
  useEffect(() => {
    setIsReviewsLoading(true);
    const reviewsRef = collection(db, 'reviews');

    const unsubscribe = onSnapshot(
      reviewsRef,
      (snapshot) => {
        const fetched: Review[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.status === 'published' || !data.status) {
            fetched.push({
              id: docSnap.id,
              userId: data.userId || docSnap.id,
              displayName: data.displayName || 'Traveler',
              photoURL: data.photoURL || null,
              rating: typeof data.rating === 'number' ? data.rating : 5,
              comment: data.comment || '',
              status: data.status || 'published',
              createdAt: data.createdAt || null,
              updatedAt: data.updatedAt || null,
            });
          }
        });
        setReviews(fetched);
        setIsReviewsLoading(false);
        setReviewsError(null);
      },
      (error) => {
        console.error('Error fetching reviews:', error);
        setReviewsError(error.message || "Unable to load reviews right now.");
        setIsReviewsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Identify user's existing review (if any)
  const userExistingReview = useMemo(() => {
    if (currentUser) {
      const found = reviews.find((r) => r.userId === currentUser.uid);
      if (found) return found;
    }
    if (myReviewIds.length > 0) {
      const found = reviews.find((r) => myReviewIds.includes(r.id));
      if (found) return found;
    }
    return null;
  }, [currentUser, reviews, myReviewIds]);

  // Calculate dynamic review statistics
  const stats: ReviewStats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const sum = reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    const avg = Number((sum / total).toFixed(1));

    const dist: Record<1 | 2 | 3 | 4 | 5, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      dist[star] = (dist[star] || 0) + 1;
    });

    return {
      averageRating: avg,
      totalReviews: total,
      distribution: dist,
    };
  }, [reviews]);

  // Sort reviews based on user selection
  const sortedReviews = useMemo(() => {
    const copy = [...reviews];
    if (sortBy === 'highest') {
      return copy.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'lowest') {
      return copy.sort((a, b) => a.rating - b.rating);
    }
    // 'newest' by creation time
    return copy.sort((a, b) => {
      const timeA = a.createdAt?.seconds || 0;
      const timeB = b.createdAt?.seconds || 0;
      return timeB - timeA;
    });
  }, [reviews, sortBy]);

  // Paginated visible slice
  const visibleReviews = useMemo(() => {
    return sortedReviews.slice(0, visibleCount);
  }, [sortedReviews, visibleCount]);

  // Trigger Google Sign-In (Optional)
  const handleGoogleSignIn = async () => {
    try {
      setFormError(null);
      const cred = await loginWithGoogle();
      if (cred?.user?.displayName) {
        setNameInput(cred.user.displayName);
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setFormError('Sign-in cancelled. You can still post as a guest.');
      } else if (err.code === 'auth/network-request-failed') {
        setFormError("You're offline. Please check your connection and try again.");
      } else {
        setFormError('Google sign-in failed. You can still comment without login.');
      }
    }
  };

  // Trigger User Sign-Out
  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Sign-Out Error:', err);
    }
  };

  // Open form for writing or editing (accessible to everyone without logging in)
  const handleOpenWriteModal = (existingRev?: Review | null) => {
    setFormError(null);
    if (existingRev && typeof existingRev.rating === 'number') {
      setIsEditing(true);
      setEditingReviewId(existingRev.id);
      setNameInput(existingRev.displayName);
      setRatingInput(existingRev.rating);
      setCommentInput(existingRev.comment);
    } else if (userExistingReview) {
      setIsEditing(true);
      setEditingReviewId(userExistingReview.id);
      setNameInput(userExistingReview.displayName);
      setRatingInput(userExistingReview.rating);
      setCommentInput(userExistingReview.comment);
    } else {
      setIsEditing(false);
      setEditingReviewId(null);
      const savedName = localStorage.getItem('traveler_name') || currentUser?.displayName || '';
      setNameInput(savedName);
      setRatingInput(5);
      setCommentInput('');
    }
    setIsFormOpen(true);
  };

  // Submit new review or update existing review (no login required)
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = (nameInput || '').trim();
    const trimmedComment = commentInput.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setFormError('Please enter your name (at least 2 characters).');
      return;
    }

    if (trimmedName.length > 60) {
      setFormError('Your name cannot exceed 60 characters.');
      return;
    }

    if (!ratingInput || ratingInput < 1 || ratingInput > 5) {
      setFormError('Please select a star rating from 1 to 5.');
      return;
    }

    if (trimmedComment.length < 5) {
      setFormError('Your review comment must be at least 5 characters.');
      return;
    }

    if (trimmedComment.length > 1000) {
      setFormError('Your review comment cannot exceed 1000 characters.');
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    try {
      // Save entered name for future comments
      try {
        localStorage.setItem('traveler_name', trimmedName);
      } catch (e) {
        console.error(e);
      }

      let targetDocId = editingReviewId;
      const isUpdating = Boolean(isEditing && targetDocId);

      if (!targetDocId) {
        // Generate a new review document
        const newDocRef = doc(collection(db, 'reviews'));
        targetDocId = newDocRef.id;
      }

      const reviewDocRef = doc(db, 'reviews', targetDocId);

      const reviewPayload: any = {
        userId: currentUser ? currentUser.uid : visitorId,
        displayName: trimmedName,
        photoURL: currentUser ? (currentUser.photoURL || null) : null,
        rating: ratingInput,
        comment: trimmedComment,
        status: 'published',
        updatedAt: serverTimestamp(),
      };

      if (!isUpdating) {
        reviewPayload.createdAt = serverTimestamp();
      }

      await setDoc(reviewDocRef, reviewPayload, { merge: true });

      // Save review ID to device tracking
      const updatedIds = Array.from(new Set([...myReviewIds, targetDocId]));
      setMyReviewIds(updatedIds);
      try {
        localStorage.setItem('traveler_my_reviews', JSON.stringify(updatedIds));
      } catch (e) {
        console.error(e);
      }

      setSuccessToast(isUpdating ? 'Your review has been updated successfully.' : 'Your review has been posted successfully.');
      setIsFormOpen(false);
      setTimeout(() => setSuccessToast(null), 5000);
    } catch (err: any) {
      console.error('Failed to post review:', err);
      setFormError(err.message || "We couldn't post your review. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete review
  const handleConfirmDelete = async () => {
    if (!deletingReviewId) return;
    setIsDeleting(true);
    try {
      const reviewDocRef = doc(db, 'reviews', deletingReviewId);
      await deleteDoc(reviewDocRef);

      const updatedIds = myReviewIds.filter((id) => id !== deletingReviewId);
      setMyReviewIds(updatedIds);
      try {
        localStorage.setItem('traveler_my_reviews', JSON.stringify(updatedIds));
      } catch (e) {
        console.error(e);
      }

      setDeleteModalOpen(false);
      setDeletingReviewId(null);
      setSuccessToast('Your review has been deleted.');
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (err) {
      console.error('Failed to delete review:', err);
      setFormError('Failed to delete review. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 bg-[#050707] text-[#F3F4EF] relative overflow-hidden"
      aria-label="User Reviews and Ratings"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 bg-radial-[ellipse_80%_60%_at_50%_0%] from-[#0A2628]/40 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#184548]/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Toast */}
        {successToast && (
          <div
            role="status"
            className="mb-8 p-4 rounded-xl bg-[#09251E] border border-[#1FAF7D]/60 text-[#34D399] flex items-center justify-between gap-3 shadow-[0_8px_24px_rgba(16,185,129,0.15)] animate-fade-in"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#34D399] flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium text-[#F3F4EF]">{successToast}</span>
            </div>
            <button
              type="button"
              onClick={() => setSuccessToast(null)}
              className="text-[#34D399]/80 hover:text-[#34D399] p-1 rounded-md transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2525] border border-[#144245] text-[#C89D4B] text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-[#C89D4B] text-[#C89D4B]" aria-hidden="true" />
              <span>USER REVIEWS • DURGA PUJA 2026</span>
            </div>

            <h2
              id="reviews-section-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-bengali-serif text-[#F3F4EF] tracking-tight mb-2.5"
            >
              What Travelers Say
            </h2>

            <p className="text-base sm:text-lg text-[#A5B4B0] font-bengali-serif">
              Share your experience with <span className="font-semibold text-[#F3F4EF]">{APP_CONFIG.nameBn}</span>
            </p>
          </div>

          {/* Action Deck: User Info & Write Review Button */}
          <div className="flex flex-wrap items-center gap-3">
            {currentUser && (
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#091F20] border border-[#164144] text-xs text-[#E6F4F1]">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover border border-[#2FA49F]/40"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#184548] text-[#5EEAD4] font-bold flex items-center justify-center text-[10px]">
                    {getInitials(currentUser.displayName || 'Traveler')}
                  </div>
                )}
                <span className="font-medium truncate max-w-[120px] sm:max-w-[160px]">
                  {currentUser.displayName || 'Traveler'}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="p-1 text-[#8E9B98] hover:text-[#F87171] transition-colors rounded"
                  title="Sign out"
                  aria-label="Sign out of Google"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              id="write-review-button"
              onClick={() => handleOpenWriteModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#F3F4EF] bg-[#9E1B18] hover:bg-[#821411] active:bg-[#6D0F0D] rounded-xl shadow-[0_4px_16px_rgba(158,27,24,0.35)] transition-all cursor-pointer"
            >
              {userExistingReview ? (
                <>
                  <Edit3 className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                  <span>Edit Your Review</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                  <span>Write a Review</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Star Rating Summary & Distribution Deck */}
        <div
          id="rating-summary-container"
          className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#082224]/90 via-[#061819]/95 to-[#040F10]/98 border border-[#1C4D50]/70 shadow-[0_16px_48px_rgba(0,0,0,0.6)] mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: Score Highlight */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-[#164144]/60 pb-6 md:pb-0 md:pr-8">
              <div className="text-4xl sm:text-5xl font-black font-mono text-[#F3F4EF] tracking-tight mb-1">
                {stats.totalReviews > 0 ? stats.averageRating.toFixed(1) : '—'}
                <span className="text-xl sm:text-2xl font-normal text-[#8E9B98] ml-1">/ 5</span>
              </div>

              {/* Star visuals */}
              <div className="flex items-center gap-1 my-2" aria-label={`Average rating ${stats.averageRating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(stats.averageRating)
                        ? 'fill-[#EAB308] text-[#EAB308]'
                        : 'fill-transparent text-[#264446]'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-[#A5B4B0] font-medium mt-1">
                {stats.totalReviews > 0 ? (
                  <>
                    Based on <strong className="text-[#F3F4EF]">{stats.totalReviews}</strong> traveler{' '}
                    {stats.totalReviews === 1 ? 'review' : 'reviews'}
                  </>
                ) : (
                  'No reviews posted yet'
                )}
              </p>

              {userExistingReview && (
                <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#09251E] border border-[#1FAF7D]/40 text-xs text-[#34D399]">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>You reviewed this app</span>
                </div>
              )}
            </div>

            {/* Right: 5-to-1 Star Distribution Progress Bars */}
            <div className="md:col-span-8 flex flex-col gap-2">
              {([5, 4, 3, 2, 1] as const).map((starVal) => {
                const count = stats.distribution[starVal] || 0;
                const percentage = stats.totalReviews > 0 ? Math.round((count / stats.totalReviews) * 100) : 0;

                return (
                  <div key={starVal} className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 w-12 text-[#B7C1BE] font-mono">
                      <span>{starVal}</span>
                      <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" aria-hidden="true" />
                    </div>

                    {/* Bar track */}
                    <div className="flex-1 h-2 rounded-full bg-[#091F20] overflow-hidden border border-[#143B3E]/60">
                      <div
                        className="h-full bg-gradient-to-r from-[#C89D4B] to-[#EAB308] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                        aria-valuenow={percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        role="progressbar"
                      />
                    </div>

                    <div className="w-12 text-right font-mono text-[#8E9B98] text-[11px]">
                      {count} ({percentage}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sorting Controls & Header bar */}
        <div className="flex items-center justify-between gap-4 mb-6 pt-2">
          <div className="text-xs sm:text-sm text-[#8E9B98] font-mono">
            Showing <span className="text-[#F3F4EF] font-semibold">{Math.min(visibleReviews.length, reviews.length)}</span> of{' '}
            <span className="text-[#F3F4EF] font-semibold">{reviews.length}</span> reviews
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="review-sort-select" className="text-xs text-[#8E9B98] hidden sm:inline">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="review-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#091F20] text-[#E6F4F1] text-xs rounded-lg px-3 py-1.5 pr-8 border border-[#164144] focus:outline-none focus:border-[#2FA49F] cursor-pointer"
                aria-label="Sort reviews"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8E9B98] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Reviews List / Grid */}
        {isReviewsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="p-5 rounded-2xl bg-[#061819]/80 border border-[#164144]/60 animate-pulse flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0E2F32]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="w-28 h-4 bg-[#0E2F32] rounded" />
                    <div className="w-16 h-3 bg-[#0E2F32] rounded" />
                  </div>
                </div>
                <div className="w-full h-12 bg-[#0E2F32]/60 rounded" />
              </div>
            ))}
          </div>
        ) : reviewsError ? (
          <div className="p-8 rounded-2xl bg-[#1A1212] border border-[#522020] text-center max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-[#F87171] mx-auto mb-3" aria-hidden="true" />
            <p className="text-sm text-[#FCA5A5] mb-4">{reviewsError}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-xs font-semibold text-[#F3F4EF] bg-[#7F1D1D] hover:bg-[#991B1B] rounded-lg transition-colors cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        ) : reviews.length === 0 ? (
          /* Empty State: Prompting first review */
          <div
            id="empty-reviews-state"
            className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#082224]/70 to-[#051415]/80 border border-[#164144]/80 text-center max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#0B2525] border border-[#1FAF7D]/30 text-[#34D399] mx-auto flex items-center justify-center mb-4 shadow-sm">
              <Sparkles className="w-7 h-7" aria-hidden="true" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-bengali-serif text-[#F3F4EF] mb-2">
              Be the first to review
            </h3>

            <p className="text-sm text-[#A5B4B0] mb-6 leading-relaxed">
              Your experience can help other Durga Puja travelers explore Bengal's pandals seamlessly.
            </p>

            <button
              type="button"
              onClick={() => handleOpenWriteModal()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#F3F4EF] bg-[#9E1B18] hover:bg-[#821411] rounded-xl shadow-[0_4px_20px_rgba(158,27,24,0.4)] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Write a Review</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8">
            {visibleReviews.map((rev) => {
              const isOwner = Boolean(
                (currentUser && rev.userId === currentUser.uid) ||
                myReviewIds.includes(rev.id) ||
                (visitorId && rev.userId === visitorId)
              );

              return (
                <div
                  key={rev.id}
                  id={`review-card-${rev.id}`}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isOwner
                      ? 'bg-[#082224]/90 border-[#1FAF7D]/50 shadow-[0_8px_32px_rgba(16,185,129,0.08)]'
                      : 'bg-[#061819]/80 border-[#164144]/70 hover:border-[#215E63]'
                  }`}
                >
                  <div>
                    {/* Author & Timestamp Header */}
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-3 min-w-0">
                        {rev.photoURL ? (
                          <img
                            src={rev.photoURL}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-[#2FA49F]/30 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#0E2F32] border border-[#1FAF7D]/30 text-[#5EEAD4] font-bold flex items-center justify-center text-xs flex-shrink-0">
                            {getInitials(rev.displayName)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-[#F3F4EF] truncate">
                              {rev.displayName}
                            </h4>
                            {isOwner && (
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#1FAF7D]/20 text-[#34D399] border border-[#1FAF7D]/40 flex-shrink-0">
                                You
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-[#7F8C89] font-mono mt-0.5">
                            <Clock className="w-3 h-3 text-[#5A7472]" aria-hidden="true" />
                            <span>{formatRelativeTime(rev.createdAt)}</span>
                            {rev.updatedAt && rev.createdAt && rev.updatedAt.seconds !== rev.createdAt.seconds && (
                              <span className="text-[#34D399] font-medium">• (Updated)</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stars for this review */}
                      <div className="flex items-center gap-0.5 flex-shrink-0" aria-label={`${rev.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= rev.rating
                                ? 'fill-[#EAB308] text-[#EAB308]'
                                : 'fill-transparent text-[#264446]'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Comment Body (Safe plain text rendering) */}
                    <p className="text-xs sm:text-sm text-[#C8D3D0] leading-relaxed whitespace-pre-wrap break-words">
                      {rev.comment}
                    </p>
                  </div>

                  {/* Owner Controls (Edit / Delete) */}
                  {isOwner && (
                    <div className="flex items-center justify-end gap-3 mt-4 pt-3.5 border-t border-[#164144]/60">
                      <button
                        type="button"
                        onClick={() => handleOpenWriteModal(rev)}
                        className="inline-flex items-center gap-1.5 text-xs text-[#5EEAD4] hover:text-[#34D399] transition-colors cursor-pointer"
                        aria-label="Edit your review"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Review</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDeletingReviewId(rev.id);
                          setDeleteModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-[#F87171] hover:text-[#EF4444] transition-colors cursor-pointer"
                        aria-label="Delete your review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Pagination Button */}
        {reviews.length > visibleCount && (
          <div className="text-center pt-2">
            <button
              type="button"
              id="load-more-reviews-button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#081F20] hover:bg-[#0C2B2D] border border-[#164144] hover:border-[#215E63] text-xs sm:text-sm font-semibold text-[#B7C1BE] hover:text-[#F3F4EF] transition-colors cursor-pointer"
            >
              <span>Load More Reviews</span>
              <ChevronDown className="w-4 h-4 text-[#C89D4B]" />
            </button>
          </div>
        )}
      </div>

      {/* Review Submission / Editing Modal */}
      {isFormOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-review-heading"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#07191A] border border-[#1F5356] shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-[#8E9B98] hover:text-[#F3F4EF] rounded-lg transition-colors cursor-pointer"
              aria-label="Close review dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-5 pb-4 border-b border-[#144245]/60">
              <h3 id="modal-review-heading" className="text-xl font-bold font-bengali-serif text-[#F3F4EF] mb-1">
                {isEditing ? 'Edit Your Review' : 'Write a Review'}
              </h3>
              <p className="text-xs text-[#8E9B98]">
                Share your experience with শারদ ভ্রমণ. Anyone can comment without logging in.
              </p>
            </div>

            {/* Optional Google Profile Connection Bar */}
            {currentUser ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#091F20] border border-[#164144] mb-4 text-xs text-[#E6F4F1]">
                <div className="flex items-center gap-2 min-w-0">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover border border-[#2FA49F]/40 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#184548] text-[#5EEAD4] font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                      {getInitials(currentUser.displayName || 'Traveler')}
                    </div>
                  )}
                  <span className="truncate">
                    Connected as <strong className="text-[#5EEAD4]">{currentUser.displayName}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-[#8E9B98] hover:text-[#F87171] text-[11px] underline flex-shrink-0 ml-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#082224]/60 border border-[#164144]/60 mb-4 text-xs">
                <span className="text-[#7E9390] text-[11px]">Login not required to comment</span>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#F2F2F2] text-[#1F1F1F] font-semibold text-[11px] transition-colors cursor-pointer"
                  title="Sign in with Google to use your Google photo and verified name"
                >
                  <GoogleGLogo className="w-3.5 h-3.5" />
                  <span>Google Photo (Optional)</span>
                </button>
              </div>
            )}

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-[#2A1111] border border-[#5E2020] text-xs text-[#F87171] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Direct Form */}
            <form onSubmit={handleSubmitReview}>
              {/* Name Input Field */}
              <div className="mb-4">
                <label htmlFor="reviewer-name-input" className="block text-xs font-semibold uppercase tracking-wider text-[#A5B4B0] mb-1.5">
                  Your Name <span className="text-[#F87171]">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 w-6 h-6 rounded-full bg-[#0E2F32] border border-[#1FAF7D]/30 text-[#5EEAD4] font-bold flex items-center justify-center text-[10px] pointer-events-none">
                    {getInitials(nameInput || 'Traveler')}
                  </div>
                  <input
                    type="text"
                    id="reviewer-name-input"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Rahul Sen / অনির্বাণ সেন"
                    maxLength={60}
                    required
                    className="w-full pl-11 pr-3.5 py-2.5 rounded-xl bg-[#051314] border border-[#164144] focus:border-[#2FA49F] focus:outline-none text-xs sm:text-sm text-[#F3F4EF] placeholder-[#5A7472]"
                  />
                </div>
              </div>

              {/* Rating Input Field */}
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A5B4B0] mb-2">
                  Your Rating <span className="text-[#F87171]">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating !== null ? hoverRating : ratingInput) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingInput(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 rounded-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C89D4B] transition-transform cursor-pointer"
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            isFilled
                              ? 'fill-[#EAB308] text-[#EAB308]'
                              : 'fill-transparent text-[#264446]'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-mono text-[#C89D4B] font-semibold ml-2">
                    {ratingInput === 5 && 'Excellent'}
                    {ratingInput === 4 && 'Very Good'}
                    {ratingInput === 3 && 'Good'}
                    {ratingInput === 2 && 'Fair'}
                    {ratingInput === 1 && 'Poor'}
                  </span>
                </div>
              </div>

              {/* Comment Input Field */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="review-comment-textarea" className="text-xs font-semibold uppercase tracking-wider text-[#A5B4B0]">
                    Your Experience <span className="text-[#F87171]">*</span>
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      commentInput.length > 1000
                        ? 'text-[#F87171] font-bold'
                        : commentInput.length < 5
                        ? 'text-[#8E9B98]'
                        : 'text-[#34D399]'
                    }`}
                  >
                    {commentInput.length} / 1000
                  </span>
                </div>

                <textarea
                  id="review-comment-textarea"
                  rows={4}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Share your thoughts about pandal hopping, route guides, crowd updates or features..."
                  className="w-full px-3.5 py-3 rounded-xl bg-[#051314] border border-[#164144] focus:border-[#2FA49F] focus:outline-none text-xs sm:text-sm text-[#F3F4EF] placeholder-[#5A7472] resize-none leading-relaxed"
                  required
                />
                <p className="text-[11px] text-[#6E827F] mt-1">
                  Minimum 5 characters. Anyone can post without signing in.
                </p>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={formSubmitting}
                  className="px-4 py-2.5 rounded-xl border border-[#164144] text-xs font-medium text-[#B7C1BE] hover:text-[#F3F4EF] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  id="submit-review-button"
                  disabled={formSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#F3F4EF] bg-[#9E1B18] hover:bg-[#821411] active:bg-[#6D0F0D] rounded-xl shadow-[0_4px_16px_rgba(158,27,24,0.35)] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {formSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{isEditing ? 'Updating…' : 'Posting…'}</span>
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{isEditing ? 'Update Review' : 'Post Review'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-delete-heading"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div className="w-full max-w-md rounded-3xl p-6 bg-[#07191A] border border-[#522020] shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
            <div className="w-12 h-12 rounded-2xl bg-[#2A1111] border border-[#5E2020] text-[#F87171] flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" aria-hidden="true" />
            </div>

            <h3 id="modal-delete-heading" className="text-xl font-bold text-[#F3F4EF] mb-2">
              Delete your review?
            </h3>

            <p className="text-xs sm:text-sm text-[#A5B4B0] mb-6 leading-relaxed">
              Are you sure you want to remove your review? This action cannot be undone and your rating will be removed from the community score.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl border border-[#164144] text-xs font-medium text-[#B7C1BE] hover:text-[#F3F4EF] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                id="confirm-delete-button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#F3F4EF] bg-[#7F1D1D] hover:bg-[#991B1B] rounded-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Deleting…</span>
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

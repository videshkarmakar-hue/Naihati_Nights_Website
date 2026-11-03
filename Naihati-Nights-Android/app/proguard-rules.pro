# ProGuard rules for the Naihati Nights APK installation system.
# This project intentionally ships with debug/development optimizations only.
# In a release build, keep the install engine classes for reflection-based
# dynamic loading and consistent error mapping.
-keep class com.videsh.naihatinights.install.** { *; }
-keep class com.videsh.naihatinights.ui.** { *; }

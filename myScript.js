function main() {
    Java.perform(function () {
        var ActivityThread = Java.use("android.app.ActivityThread");
        var PackageManager = Java.use("android.content.pm.PackageManager");
        var context = ActivityThread.currentApplication().getApplicationContext();
        var packageName = context.getPackageName();
        var packageInfo = context.getPackageManager().getPackageInfo(packageName,
            PackageManager.GET_ACTIVITIES.value | PackageManager.GET_SERVICES.value | PackageManager.GET_RECEIVERS.value | PackageManager.GET_PROVIDERS.value
        );

        function logWithColor(text, colorCode) {
            console.log("\u001b[" + colorCode + "m" + text + "\u001b[0m");
        }

        logWithColor("[+] Package Name: " + packageName, "32"); // Green

        function logComponents(componentInfoArray, componentType) {
            if (componentInfoArray) {
                for (var i = 0; i < componentInfoArray.length; i++) {
                    var component = componentInfoArray[i];
                    var exported = component.exported.value ? "Exported" : "Non-Exported";
                    var colorCode = component.exported.value ? "32" : "33"; // Green for exported, Yellow for non-exported
                    logWithColor("  [-] " + exported + " " + componentType + " " + packageName + "/" + component.name.value, colorCode);
                }
            }
        }

        logWithColor("\n[+] Activities:", "34"); // Blue
        logComponents(packageInfo.activities.value, "Activity");

        logWithColor("\n[+] Services:", "34"); // Blue
        logComponents(packageInfo.services.value, "Service");

        logWithColor("\n[+] Broadcast Receivers:", "34"); // Blue
        logComponents(packageInfo.receivers.value, "Broadcast Receiver");

        logWithColor("\n[+] Content Providers:", "34"); // Blue
        logComponents(packageInfo.providers.value, "Content Provider");

        // Access the resources and get the "firebase_database_url"
        var Resources = Java.use("android.content.res.Resources");
        var resourceId = context.getResources().getIdentifier("firebase_database_url", "string", packageName);

        if (resourceId != 0) {
            var firebaseDatabaseUrl = context.getResources().getString(resourceId);
            logWithColor("\n[+] Firebase Database URL: " + firebaseDatabaseUrl, "32"); // Green
        } else {
            logWithColor("\n[-] Firebase Database URL not found.", "31"); // Red
        }

        // Additional information about the APK
        var appInfo = packageInfo.applicationInfo.value;
        logWithColor("\n[+] APK File Path: " + appInfo.sourceDir.value, "32"); // Green
        logWithColor("[+] APK Data Directory: " + appInfo.dataDir.value, "32"); // Green

        logWithColor("\n[+] Done.", "32"); // Green
    });
}

setTimeout(function () {
    Java.scheduleOnMainThread(main);
}, 50);

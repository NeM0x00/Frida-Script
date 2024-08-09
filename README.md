# Frida-Script
Frida script that grabs some information about the application to make it easy to test them for penetration testing and bug hunting

Component Information Retrieval:

The script retrieves and logs detailed information about the following Android components in the application:

Activities
Services
Broadcast Receivers
Content Providers

For each component, it checks whether the component is exported (i.e., available to other applications) or non-exported and logs this information with appropriate color-coding:
Green for exported components.
Yellow for non-exported components.

The logComponents function handles this logging by iterating through the component arrays and printing their status and names.
Resource Access:

The script attempts to access a specific string resource, "firebase_database_url", from the application's resources.
If the resource exists, it logs the Firebase Database URL; otherwise, it logs that the resource was not found.
APK Information:

It retrieves and logs the path to the APK file and the data directory of the application, providing insights into where the application is installed and where its data is stored.

# How to Use It?

Let's connect the Frida-server. 

![image](https://github.com/user-attachments/assets/9e37bd52-64db-4201-b21c-42778a48ba81)

Specific the application you want to run the script on. 

```
frida-ps -Uai

-U to connect the device
-a to list all applications
-i for installed applications
Hint: You can't use "i" without "a." 
```

![image](https://github.com/user-attachments/assets/9f1f891e-2fd1-49e9-8d92-3c344749c5ad)


```
frida -U -f package_name -l the script

-U to connect to the device
-f to hook the application's package
-l any script for Frida 
```
The results be like that :

![image](https://github.com/user-attachments/assets/1c29ba34-80b2-4471-b49f-e747b93f6e97)

Thank you 

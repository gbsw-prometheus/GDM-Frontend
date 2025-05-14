import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import RNBootSplash

@main
class AppDelegate: RCTAppDelegate {
    override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        self.moduleName = "GDM"
        self.dependencyProvider = RCTAppDependencyProvider()
        self.initialProps = [:]
        
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
    
    override func sourceURL(for bridge: RCTBridge) -> URL? {
        return self.bundleURL()
    }
    
    override func bundleURL() -> URL? {
        #if DEBUG
        return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
        #else
        return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
        #endif
    }

    override func customize(_ rootView: RCTRootView!) {
        super.customize(rootView)
        RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView) // ⬅️ initialize the splash screen
    }
}

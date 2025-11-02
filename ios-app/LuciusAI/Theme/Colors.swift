import SwiftUI

extension Color {
    // Primary Colors (Stripe-inspired palette)
    static let primaryNavy = Color(red: 0.04, green: 0.15, blue: 0.25) // #0A2540
    static let accentPurple = Color(red: 0.39, green: 0.36, blue: 1.0) // #635BFF
    static let accentPurpleDark = Color(red: 0.32, green: 0.28, blue: 0.85) // Darker shade
    
    // Background Colors
    static let bgPrimaryLight = Color(red: 0.96, green: 0.98, blue: 0.99) // #F6F9FC
    static let bgSecondaryLight = Color.white
    static let bgCardLight = Color.white
    
    static let bgPrimaryDark = Color(red: 0.04, green: 0.15, blue: 0.25) // #0A2540
    static let bgSecondaryDark = Color(red: 0.06, green: 0.18, blue: 0.29)
    static let bgCardDark = Color(red: 0.08, green: 0.22, blue: 0.35)
    
    // Text Colors
    static let textPrimaryLight = Color(red: 0.08, green: 0.13, blue: 0.19)
    static let textSecondaryLight = Color(red: 0.4, green: 0.47, blue: 0.55)
    static let textMutedLight = Color(red: 0.55, green: 0.62, blue: 0.68)
    
    static let textPrimaryDark = Color.white
    static let textSecondaryDark = Color(red: 0.88, green: 0.91, blue: 0.95)
    static let textMutedDark = Color(red: 0.68, green: 0.75, blue: 0.82)
    
    // Border Colors
    static let borderLight = Color(red: 0.88, green: 0.92, blue: 0.95)
    static let borderDark = Color(red: 0.2, green: 0.3, blue: 0.42)
    
    // Context-aware colors
    static func bgPrimary(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? bgPrimaryDark : bgPrimaryLight
    }
    
    static func bgSecondary(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? bgSecondaryDark : bgSecondaryLight
    }
    
    static func bgCard(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? bgCardDark : bgCardLight
    }
    
    static func textPrimary(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? textPrimaryDark : textPrimaryLight
    }
    
    static func textSecondary(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? textSecondaryDark : textSecondaryLight
    }
    
    static func textMuted(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? textMutedDark : textMutedLight
    }
    
    static func border(for colorScheme: ColorScheme) -> Color {
        colorScheme == .dark ? borderDark : borderLight
    }
}

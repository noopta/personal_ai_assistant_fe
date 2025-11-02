import SwiftUI

struct FeatureCard: View {
    let icon: String
    let title: String
    let description: String
    let badgeText: String?
    @Environment(\.colorScheme) var colorScheme
    @State private var isHovered = false
    
    init(icon: String, title: String, description: String, badgeText: String? = nil) {
        self.icon = icon
        self.title = title
        self.description = description
        self.badgeText = badgeText
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Icon
            ZStack {
                Circle()
                    .fill(Color.accentPurple.opacity(0.1))
                    .frame(width: 64, height: 64)
                
                Image(systemName: icon)
                    .font(.system(size: 28))
                    .foregroundColor(.accentPurple)
            }
            
            // Title with optional badge
            HStack {
                Text(title)
                    .font(.system(size: 20, weight: .bold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
                
                if let badgeText = badgeText {
                    Text(badgeText)
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.accentPurple)
                        .cornerRadius(12)
                }
            }
            
            // Description
            Text(description)
                .font(.system(size: 15))
                .foregroundColor(Color.textSecondary(for: colorScheme))
                .lineSpacing(4)
        }
        .padding(32)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.bgCard(for: colorScheme))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.border(for: colorScheme), lineWidth: 1)
        )
        .shadow(color: Color.black.opacity(colorScheme == .dark ? 0.3 : 0.05), radius: 8, x: 0, y: 4)
    }
}

import SwiftUI

struct PrimaryButton: View {
    let title: String
    let action: () -> Void
    var icon: String? = nil
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                Text(title)
                    .font(.system(size: 16, weight: .semibold))
                
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 14))
                }
            }
            .foregroundColor(.white)
            .padding(.horizontal, 28)
            .padding(.vertical, 14)
            .background(Color.accentPurple)
            .cornerRadius(28)
            .shadow(color: Color.accentPurple.opacity(0.4), radius: 12, x: 0, y: 4)
        }
        .buttonStyle(ScaleButtonStyle())
    }
}

struct SecondaryButton: View {
    let title: String
    let action: () -> Void
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 16, weight: .semibold))
                .foregroundColor(.accentPurple)
                .padding(.horizontal, 28)
                .padding(.vertical, 14)
                .background(Color.clear)
                .overlay(
                    RoundedRectangle(cornerRadius: 28)
                        .stroke(Color.border(for: colorScheme), lineWidth: 2)
                )
        }
        .buttonStyle(ScaleButtonStyle())
    }
}

struct ScaleButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.96 : 1.0)
            .animation(.easeInOut(duration: 0.2), value: configuration.isPressed)
    }
}

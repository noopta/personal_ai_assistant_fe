import SwiftUI

struct IntegrationsView: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        ScrollView {
            VStack(spacing: 48) {
                // Header
                VStack(spacing: 16) {
                    Text("Integrations")
                        .font(.system(size: 48, weight: .bold))
                        .foregroundColor(Color.textPrimary(for: colorScheme))
                    
                    Text("Connect your favorite tools and services")
                        .font(.system(size: 18))
                        .foregroundColor(Color.textSecondary(for: colorScheme))
                }
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
                .padding(.top, 40)
                
                // Integration Cards
                VStack(spacing: 24) {
                    IntegrationCard(
                        icon: "envelope.fill",
                        title: "Gmail",
                        description: "Manage your emails with AI-powered assistance. Automatically organize, prioritize, and respond to messages.",
                        status: .available,
                        scopes: ["Read emails", "Send emails", "Manage labels"]
                    )
                    
                    IntegrationCard(
                        icon: "calendar",
                        title: "Google Calendar",
                        description: "Seamlessly manage your schedule. Create events, set reminders, and coordinate meetings effortlessly.",
                        status: .available,
                        scopes: ["Read calendar", "Create events", "Manage events"]
                    )
                    
                    IntegrationCard(
                        icon: "note.text",
                        title: "Notion",
                        description: "Connect your workspace for unified productivity. Sync notes, tasks, and databases with AI assistance.",
                        status: .comingSoon,
                        scopes: ["Read pages", "Create pages", "Update databases"]
                    )
                }
                .padding(.horizontal, 32)
                
                // How to Connect Section
                VStack(spacing: 32) {
                    Text("How to Connect")
                        .font(.system(size: 32, weight: .bold))
                        .foregroundColor(Color.textPrimary(for: colorScheme))
                    
                    VStack(spacing: 20) {
                        StepCard(number: 1, title: "Select Integration", description: "Choose the service you want to connect")
                        StepCard(number: 2, title: "Authorize Access", description: "Grant Lucius AI permission to access your account")
                        StepCard(number: 3, title: "Start Using", description: "Begin automating your workflow with AI assistance")
                    }
                }
                .padding(.horizontal, 32)
                
                // Help Section
                VStack(spacing: 24) {
                    Text("Need Help?")
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(Color.textPrimary(for: colorScheme))
                    
                    Text("Our team is here to assist you with integration setup and troubleshooting.")
                        .font(.system(size: 16))
                        .foregroundColor(Color.textSecondary(for: colorScheme))
                        .multilineTextAlignment(.center)
                    
                    SecondaryButton(title: "Contact Support", action: {})
                }
                .padding(.horizontal, 32)
                .padding(.bottom, 40)
            }
        }
        .background(Color.bgPrimary(for: colorScheme))
    }
}

enum IntegrationStatus {
    case available
    case comingSoon
}

struct IntegrationCard: View {
    let icon: String
    let title: String
    let description: String
    let status: IntegrationStatus
    let scopes: [String]
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Header
            HStack {
                ZStack {
                    Circle()
                        .fill(Color.accentPurple.opacity(0.1))
                        .frame(width: 56, height: 56)
                    
                    Image(systemName: icon)
                        .font(.system(size: 24))
                        .foregroundColor(.accentPurple)
                }
                
                VStack(alignment: .leading, spacing: 4) {
                    HStack {
                        Text(title)
                            .font(.system(size: 24, weight: .bold))
                            .foregroundColor(Color.textPrimary(for: colorScheme))
                        
                        if status == .comingSoon {
                            Text("Coming Soon")
                                .font(.system(size: 11, weight: .semibold))
                                .foregroundColor(.white)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Color.accentPurple)
                                .cornerRadius(12)
                        }
                    }
                }
                
                Spacer()
            }
            
            // Description
            Text(description)
                .font(.system(size: 15))
                .foregroundColor(Color.textSecondary(for: colorScheme))
                .lineSpacing(4)
            
            // Scopes
            VStack(alignment: .leading, spacing: 8) {
                Text("Capabilities:")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundColor(Color.textMuted(for: colorScheme))
                
                ForEach(scopes, id: \.self) { scope in
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 12))
                            .foregroundColor(.accentPurple)
                        
                        Text(scope)
                            .font(.system(size: 13))
                            .foregroundColor(Color.textSecondary(for: colorScheme))
                    }
                }
            }
            
            // Connect Button
            if status == .available {
                Button(action: {}) {
                    Text("Connect")
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(Color.accentPurple)
                        .cornerRadius(12)
                }
            }
        }
        .padding(24)
        .background(Color.bgCard(for: colorScheme))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.border(for: colorScheme), lineWidth: 1)
        )
        .shadow(color: Color.black.opacity(0.05), radius: 8, x: 0, y: 4)
    }
}

struct StepCard: View {
    let number: Int
    let title: String
    let description: String
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        HStack(spacing: 16) {
            // Number Badge
            ZStack {
                Circle()
                    .fill(Color.accentPurple)
                    .frame(width: 40, height: 40)
                
                Text("\(number)")
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(.white)
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
                
                Text(description)
                    .font(.system(size: 14))
                    .foregroundColor(Color.textSecondary(for: colorScheme))
            }
            
            Spacer()
        }
        .padding(16)
        .background(Color.bgCard(for: colorScheme))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.border(for: colorScheme), lineWidth: 1)
        )
    }
}

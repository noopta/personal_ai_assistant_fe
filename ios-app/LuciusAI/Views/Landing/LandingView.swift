import SwiftUI

struct LandingView: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Hero Section
                HeroSection()
                
                // Features Section
                FeaturesSection()
                
                // Benefits Section
                BenefitsSection()
                
                // CTA Section
                CTASection()
            }
        }
        .background(Color.bgPrimary(for: colorScheme))
    }
}

struct HeroSection: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        VStack(spacing: 40) {
            VStack(spacing: 24) {
                Text("AI-powered assistant\nto grow ")
                    .font(.system(size: 48, weight: .bold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
                    + Text("your\nproductivity")
                    .font(.system(size: 48, weight: .bold))
                    .foregroundColor(.accentPurple)
                
                Text("Join thousands of users managing Gmail and Google Calendar through intelligent AI assistance. Streamline your workflow, automate repetitive tasks, and build a more productive day.")
                    .font(.system(size: 18))
                    .foregroundColor(Color.textSecondary(for: colorScheme))
                    .lineSpacing(6)
                    .multilineTextAlignment(.center)
                
                HStack(spacing: 16) {
                    PrimaryButton(title: "Start now", icon: "arrow.right", action: {})
                    SecondaryButton(title: "View integrations", action: {})
                }
            }
            .padding(.horizontal, 32)
            
            // Dashboard Preview Card
            DashboardPreview()
                .padding(.horizontal, 32)
        }
        .padding(.vertical, 80)
    }
}

struct DashboardPreview: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Today")
                    .font(.system(size: 20, weight: .bold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
                
                Spacer()
                
                Text("Live")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color.green)
                    .cornerRadius(16)
            }
            
            Divider()
            
            TaskRow(icon: "checkmark.circle.fill", color: .green, title: "Organized calendar events")
            TaskRow(icon: "envelope.fill", color: .blue, title: "Processed 12 emails")
            TaskRow(icon: "calendar", color: .accentPurple, title: "Scheduled team meeting")
        }
        .padding(24)
        .background(Color.bgCard(for: colorScheme))
        .cornerRadius(20)
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color.border(for: colorScheme), lineWidth: 1)
        )
        .shadow(color: Color.black.opacity(0.1), radius: 20, x: 0, y: 8)
    }
}

struct TaskRow: View {
    let icon: String
    let color: Color
    let title: String
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 18))
                .foregroundColor(color)
                .frame(width: 32, height: 32)
            
            Text(title)
                .font(.system(size: 15))
                .foregroundColor(Color.textPrimary(for: colorScheme))
            
            Spacer()
        }
        .padding(.vertical, 4)
    }
}

struct FeaturesSection: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        VStack(spacing: 48) {
            VStack(spacing: 16) {
                Text("Everything you need")
                    .font(.system(size: 40, weight: .bold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
                
                Text("Powerful AI assistance for your daily productivity tasks")
                    .font(.system(size: 18))
                    .foregroundColor(Color.textSecondary(for: colorScheme))
            }
            .multilineTextAlignment(.center)
            .padding(.horizontal, 32)
            
            VStack(spacing: 24) {
                FeatureCard(
                    icon: "envelope.fill",
                    title: "Gmail Management",
                    description: "Intelligently organize, prioritize, and respond to emails with AI-powered assistance."
                )
                
                FeatureCard(
                    icon: "calendar",
                    title: "Calendar Integration",
                    description: "Seamlessly manage your schedule, set up meetings, and never miss an important event."
                )
                
                FeatureCard(
                    icon: "note.text",
                    title: "Notion Integration",
                    description: "Connect your notes and documents for a unified productivity experience.",
                    badgeText: "Coming Soon"
                )
            }
            .padding(.horizontal, 32)
        }
        .padding(.vertical, 80)
        .background(Color.bgPrimary(for: colorScheme))
    }
}

struct BenefitsSection: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        VStack(spacing: 48) {
            VStack(alignment: .leading, spacing: 32) {
                Text("Built for productivity")
                    .font(.system(size: 40, weight: .bold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
                
                Text("Lucius AI helps you focus on what matters most by automating repetitive tasks and providing intelligent insights.")
                    .font(.system(size: 18))
                    .foregroundColor(Color.textSecondary(for: colorScheme))
                    .lineSpacing(6)
                
                VStack(alignment: .leading, spacing: 24) {
                    BenefitRow(icon: "zap.fill", title: "Lightning Fast", description: "Instant responses and real-time updates")
                    BenefitRow(icon: "lock.shield.fill", title: "Secure & Private", description: "Your data is encrypted and protected")
                    BenefitRow(icon: "sparkles", title: "AI-Powered", description: "Advanced machine learning for smart assistance")
                }
            }
            .padding(.horizontal, 32)
        }
        .padding(.vertical, 80)
        .background(Color.bgSecondary(for: colorScheme))
    }
}

struct BenefitRow: View {
    let icon: String
    let title: String
    let description: String
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        HStack(alignment: .top, spacing: 16) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundColor(.accentPurple)
                .frame(width: 32, height: 32)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
                
                Text(description)
                    .font(.system(size: 15))
                    .foregroundColor(Color.textSecondary(for: colorScheme))
            }
        }
    }
}

struct CTASection: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        VStack(spacing: 32) {
            Text("Ready to transform your workflow?")
                .font(.system(size: 40, weight: .bold))
                .foregroundColor(Color.textPrimary(for: colorScheme))
                .multilineTextAlignment(.center)
            
            Text("Get started with Lucius AI today and experience the future of productivity management.")
                .font(.system(size: 18))
                .foregroundColor(Color.textSecondary(for: colorScheme))
                .multilineTextAlignment(.center)
            
            PrimaryButton(title: "Get started", icon: "arrow.right", action: {})
        }
        .padding(.horizontal, 32)
        .padding(.vertical, 80)
        .background(Color.bgPrimary(for: colorScheme))
    }
}

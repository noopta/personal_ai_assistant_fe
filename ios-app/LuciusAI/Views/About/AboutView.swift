import SwiftUI

struct AboutView: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        ScrollView {
            VStack(spacing: 48) {
                // Hero
                VStack(spacing: 16) {
                    Text("About Lucius AI")
                        .font(.system(size: 48, weight: .bold))
                        .foregroundColor(Color.textPrimary(for: colorScheme))
                    
                    Text("Building the future of AI-powered productivity")
                        .font(.system(size: 18))
                        .foregroundColor(Color.textSecondary(for: colorScheme))
                }
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
                .padding(.top, 40)
                
                // Mission & Vision
                VStack(spacing: 24) {
                    InfoCard(
                        icon: "target",
                        title: "Our Mission",
                        description: "To empower individuals and teams with intelligent AI assistance that transforms how they manage their daily productivity and workflow."
                    )
                    
                    InfoCard(
                        icon: "eye.fill",
                        title: "Our Vision",
                        description: "A world where everyone has access to personalized AI assistance that helps them achieve more while maintaining work-life balance."
                    )
                }
                .padding(.horizontal, 32)
                
                // Values
                VStack(spacing: 32) {
                    Text("Our Values")
                        .font(.system(size: 32, weight: .bold))
                        .foregroundColor(Color.textPrimary(for: colorScheme))
                    
                    VStack(spacing: 20) {
                        ValueCard(icon: "person.2.fill", title: "User-Centric", description: "We put our users' needs first in every decision")
                        ValueCard(icon: "lock.shield.fill", title: "Privacy First", description: "Your data security and privacy are our top priority")
                        ValueCard(icon: "lightbulb.fill", title: "Innovation", description: "Continuously pushing boundaries with cutting-edge AI")
                        ValueCard(icon: "heart.fill", title: "Integrity", description: "Building trust through transparency and honesty")
                    }
                }
                .padding(.horizontal, 32)
                
                // Team Section
                VStack(spacing: 32) {
                    Text("Meet the Team")
                        .font(.system(size: 32, weight: .bold))
                        .foregroundColor(Color.textPrimary(for: colorScheme))
                    
                    Text("We're a passionate team of engineers, designers, and AI researchers dedicated to making productivity effortless.")
                        .font(.system(size: 16))
                        .foregroundColor(Color.textSecondary(for: colorScheme))
                        .multilineTextAlignment(.center)
                    
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 20) {
                        TeamMemberCard(name: "Alex Chen", role: "Founder & CEO", avatar: "person.circle.fill")
                        TeamMemberCard(name: "Sarah Johnson", role: "CTO", avatar: "person.circle.fill")
                        TeamMemberCard(name: "Michael Lee", role: "Head of AI", avatar: "person.circle.fill")
                        TeamMemberCard(name: "Emily Davis", role: "Head of Design", avatar: "person.circle.fill")
                    }
                }
                .padding(.horizontal, 32)
                
                // Technology
                VStack(spacing: 24) {
                    Text("Built with Modern Technology")
                        .font(.system(size: 28, weight: .bold))
                        .foregroundColor(Color.textPrimary(for: colorScheme))
                    
                    VStack(spacing: 16) {
                        TechTag(name: "GPT-4")
                        TechTag(name: "React & SwiftUI")
                        TechTag(name: "Node.js")
                        TechTag(name: "PostgreSQL")
                        TechTag(name: "Redis")
                    }
                }
                .padding(.horizontal, 32)
                
                // Contact
                VStack(spacing: 24) {
                    Text("Get in Touch")
                        .font(.system(size: 28, weight: .bold))
                        .foregroundColor(Color.textPrimary(for: colorScheme))
                    
                    Text("Have questions or feedback? We'd love to hear from you.")
                        .font(.system(size: 16))
                        .foregroundColor(Color.textSecondary(for: colorScheme))
                        .multilineTextAlignment(.center)
                    
                    PrimaryButton(title: "Contact Us", icon: "envelope.fill", action: {})
                }
                .padding(.horizontal, 32)
                .padding(.bottom, 40)
            }
        }
        .background(Color.bgPrimary(for: colorScheme))
    }
}

struct InfoCard: View {
    let icon: String
    let title: String
    let description: String
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.system(size: 24))
                    .foregroundColor(.accentPurple)
                    .frame(width: 40, height: 40)
                
                Text(title)
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
            }
            
            Text(description)
                .font(.system(size: 16))
                .foregroundColor(Color.textSecondary(for: colorScheme))
                .lineSpacing(6)
        }
        .padding(24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.bgCard(for: colorScheme))
        .cornerRadius(16)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.border(for: colorScheme), lineWidth: 1)
        )
        .shadow(color: Color.black.opacity(0.05), radius: 8, x: 0, y: 4)
    }
}

struct ValueCard: View {
    let icon: String
    let title: String
    let description: String
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        HStack(alignment: .top, spacing: 16) {
            ZStack {
                Circle()
                    .fill(Color.accentPurple.opacity(0.1))
                    .frame(width: 48, height: 48)
                
                Image(systemName: icon)
                    .font(.system(size: 20))
                    .foregroundColor(.accentPurple)
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.system(size: 18, weight: .bold))
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

struct TeamMemberCard: View {
    let name: String
    let role: String
    let avatar: String
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: avatar)
                .font(.system(size: 48))
                .foregroundColor(.accentPurple)
                .frame(width: 80, height: 80)
                .background(Color.accentPurple.opacity(0.1))
                .clipShape(Circle())
            
            VStack(spacing: 4) {
                Text(name)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
                
                Text(role)
                    .font(.system(size: 13))
                    .foregroundColor(Color.textSecondary(for: colorScheme))
            }
        }
        .padding(20)
        .frame(maxWidth: .infinity)
        .background(Color.bgCard(for: colorScheme))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.border(for: colorScheme), lineWidth: 1)
        )
    }
}

struct TechTag: View {
    let name: String
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        Text(name)
            .font(.system(size: 14, weight: .medium))
            .foregroundColor(Color.textPrimary(for: colorScheme))
            .padding(.horizontal, 20)
            .padding(.vertical, 10)
            .background(Color.bgCard(for: colorScheme))
            .cornerRadius(20)
            .overlay(
                RoundedRectangle(cornerRadius: 20)
                    .stroke(Color.border(for: colorScheme), lineWidth: 1)
            )
    }
}

import SwiftUI

struct ProductView: View {
    @Environment(\.colorScheme) var colorScheme
    @State private var messageText = ""
    @State private var messages: [ChatMessage] = [
        ChatMessage(text: "Hello! I'm Lucius AI. How can I help you manage your tasks today?", isUser: false)
    ]
    
    var body: some View {
        VStack(spacing: 0) {
            // Chat Header
            VStack(spacing: 8) {
                Text("Lucius AI Assistant")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(Color.textPrimary(for: colorScheme))
                
                Text("Your intelligent productivity companion")
                    .font(.system(size: 15))
                    .foregroundColor(Color.textSecondary(for: colorScheme))
            }
            .padding(.vertical, 24)
            .frame(maxWidth: .infinity)
            .background(Color.bgSecondary(for: colorScheme))
            
            Divider()
                .background(Color.border(for: colorScheme))
            
            // Chat Messages
            ScrollView {
                VStack(spacing: 16) {
                    ForEach(messages) { message in
                        ChatBubble(message: message)
                    }
                }
                .padding(20)
            }
            .frame(maxHeight: .infinity)
            
            Divider()
                .background(Color.border(for: colorScheme))
            
            // Input Area
            HStack(spacing: 12) {
                TextField("Type your message...", text: $messageText)
                    .padding(12)
                    .background(Color.bgCard(for: colorScheme))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.border(for: colorScheme), lineWidth: 1)
                    )
                
                Button(action: sendMessage) {
                    Image(systemName: "paperplane.fill")
                        .font(.system(size: 18))
                        .foregroundColor(.white)
                        .frame(width: 44, height: 44)
                        .background(messageText.isEmpty ? Color.gray : Color.accentPurple)
                        .clipShape(Circle())
                }
                .disabled(messageText.isEmpty)
            }
            .padding(16)
            .background(Color.bgPrimary(for: colorScheme))
            
            // Note about backend
            Text("Note: Backend integration coming soon")
                .font(.system(size: 13))
                .foregroundColor(Color.textMuted(for: colorScheme))
                .padding(.bottom, 8)
        }
        .background(Color.bgPrimary(for: colorScheme))
    }
    
    func sendMessage() {
        guard !messageText.isEmpty else { return }
        
        messages.append(ChatMessage(text: messageText, isUser: true))
        messageText = ""
        
        // Simulate AI response
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            messages.append(ChatMessage(text: "I understand you'd like help with that. Backend API integration is coming soon!", isUser: false))
        }
    }
}

struct ChatMessage: Identifiable {
    let id = UUID()
    let text: String
    let isUser: Bool
}

struct ChatBubble: View {
    let message: ChatMessage
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        HStack {
            if message.isUser {
                Spacer()
            }
            
            VStack(alignment: message.isUser ? .trailing : .leading, spacing: 4) {
                Text(message.text)
                    .font(.system(size: 15))
                    .foregroundColor(message.isUser ? .white : Color.textPrimary(for: colorScheme))
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(message.isUser ? Color.accentPurple : Color.bgCard(for: colorScheme))
                    .cornerRadius(20)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(message.isUser ? Color.clear : Color.border(for: colorScheme), lineWidth: 1)
                    )
            }
            
            if !message.isUser {
                Spacer()
            }
        }
    }
}

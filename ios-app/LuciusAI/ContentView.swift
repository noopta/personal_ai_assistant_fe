import SwiftUI

struct ContentView: View {
    @EnvironmentObject var themeManager: ThemeManager
    @Environment(\.colorScheme) var colorScheme
    @State private var selectedTab = 0
    
    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Custom Navigation Bar
                HStack {
                    Text("AirThreads")
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(Color.textPrimary(for: colorScheme))
                    
                    Spacer()
                    
                    // Theme Toggle Button
                    Button(action: {
                        themeManager.toggleTheme()
                    }) {
                        Image(systemName: themeManager.isDarkMode ? "sun.max.fill" : "moon.fill")
                            .font(.system(size: 20))
                            .foregroundColor(.accentPurple)
                            .frame(width: 44, height: 44)
                    }
                }
                .padding(.horizontal, 20)
                .padding(.vertical, 12)
                .background(Color.bgPrimary(for: colorScheme))
                
                // Tab Bar
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 24) {
                        TabButton(title: "Home", isSelected: selectedTab == 0) {
                            selectedTab = 0
                        }
                        TabButton(title: "Product", isSelected: selectedTab == 1) {
                            selectedTab = 1
                        }
                        TabButton(title: "Integrations", isSelected: selectedTab == 2) {
                            selectedTab = 2
                        }
                        TabButton(title: "About", isSelected: selectedTab == 3) {
                            selectedTab = 3
                        }
                    }
                    .padding(.horizontal, 20)
                }
                .padding(.vertical, 12)
                .background(Color.bgPrimary(for: colorScheme))
                
                Divider()
                    .background(Color.border(for: colorScheme))
                
                // Content
                TabView(selection: $selectedTab) {
                    LandingView()
                        .tag(0)
                    
                    ProductView()
                        .tag(1)
                    
                    IntegrationsView()
                        .tag(2)
                    
                    AboutView()
                        .tag(3)
                }
                .tabViewStyle(.page(indexDisplayMode: .never))
            }
            .background(Color.bgPrimary(for: colorScheme))
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
}

struct TabButton: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Text(title)
                    .font(.system(size: 16, weight: isSelected ? .semibold : .regular))
                    .foregroundColor(isSelected ? .accentPurple : Color.textSecondary(for: colorScheme))
                
                if isSelected {
                    Rectangle()
                        .fill(Color.accentPurple)
                        .frame(height: 2)
                }
            }
        }
    }
}

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    id: "building-scalable-react-applications",
    title: "Building Scalable React Applications: Best Practices and Patterns",
    excerpt: "Learn how to structure large React applications for maintainability and performance. We'll cover component organization, state management, and optimization techniques.",
    content: `
# Building Scalable React Applications: Best Practices and Patterns

React has become the go-to library for building modern web applications, but as projects grow in complexity, maintaining code quality and performance becomes increasingly challenging. In this comprehensive guide, we'll explore the best practices and patterns for building scalable React applications.

## Table of Contents
1. [Component Architecture](#component-architecture)
2. [State Management](#state-management)
3. [Performance Optimization](#performance-optimization)
4. [Code Organization](#code-organization)
5. [Testing Strategies](#testing-strategies)

## Component Architecture

### Atomic Design Principles

When building scalable React applications, it's crucial to follow atomic design principles:

- **Atoms**: Basic building blocks (buttons, inputs, labels)
- **Molecules**: Simple groups of atoms (search form, navigation item)
- **Organisms**: Complex components (header, sidebar, product list)
- **Templates**: Page-level objects (layout structure)
- **Pages**: Specific instances of templates

### Component Composition

Instead of creating large, monolithic components, break them down into smaller, reusable pieces:

\`\`\`jsx
// Bad: Monolithic component
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div className="header">
        <img src={user.avatar} alt={user.name} />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
      <div className="stats">
        <div className="stat">
          <span>Posts: {user.posts.length}</span>
        </div>
        <div className="stat">
          <span>Followers: {user.followers}</span>
        </div>
      </div>
      <div className="actions">
        <button>Follow</button>
        <button>Message</button>
      </div>
    </div>
  );
}

// Good: Composed components
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <UserHeader user={user} />
      <UserStats stats={user.stats} />
      <UserActions userId={user.id} />
    </div>
  );
}
\`\`\`

## State Management

### Choosing the Right State Management Solution

For scalable applications, consider these state management options:

1. **React Context + useReducer**: For simple global state
2. **Zustand**: Lightweight and simple
3. **Redux Toolkit**: For complex state logic
4. **Jotai**: Atomic state management

### State Organization

Organize your state logically:

\`\`\`javascript
// Store structure
const store = {
  auth: {
    user: null,
    isAuthenticated: false,
    permissions: []
  },
  ui: {
    theme: 'light',
    sidebarOpen: false,
    notifications: []
  },
  data: {
    users: {},
    posts: {},
    comments: {}
  }
};
\`\`\`

## Performance Optimization

### Code Splitting

Implement code splitting to reduce initial bundle size:

\`\`\`jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
\`\`\`

### Memoization

Use React.memo, useMemo, and useCallback strategically:

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);

  const handleUpdate = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onUpdate={handleUpdate} />
      ))}
    </div>
  );
});
\`\`\`

## Code Organization

### Folder Structure

Organize your code with a clear folder structure:

\`\`\`
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── pages/
├── hooks/
├── utils/
├── services/
├── store/
└── types/
\`\`\`

### Custom Hooks

Extract reusable logic into custom hooks:

\`\`\`jsx
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
\`\`\`

## Testing Strategies

### Component Testing

Write comprehensive tests for your components:

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfile } from './UserProfile';

test('renders user information correctly', () => {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.jpg'
  };

  render(<UserProfile user={user} />);
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});

test('handles follow button click', () => {
  const mockOnFollow = jest.fn();
  const user = { id: 1, name: 'John Doe' };
  
  render(<UserProfile user={user} onFollow={mockOnFollow} />);
  
  fireEvent.click(screen.getByText('Follow'));
  expect(mockOnFollow).toHaveBeenCalledWith(1);
});
\`\`\`

## Conclusion

Building scalable React applications requires careful planning and adherence to best practices. By following these patterns and principles, you can create maintainable, performant, and scalable applications that grow with your team and requirements.

Remember to:
- Keep components small and focused
- Use appropriate state management
- Optimize for performance
- Write comprehensive tests
- Maintain clear code organization

Happy coding! 🚀
    `,
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Frontend Development",
    tags: ["React", "JavaScript", "Best Practices", "Architecture"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    author: {
      name: "Yasas Banuka",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Full-stack developer passionate about creating scalable web applications and sharing knowledge with the community."
    }
  },
  {
    id: "spring-boot-security-jwt",
    title: "Spring Boot Security: Implementing JWT Authentication",
    excerpt: "A comprehensive guide to implementing secure authentication in Spring Boot applications using JWT tokens, including best practices for token management.",
    content: `
# Spring Boot Security: Implementing JWT Authentication

Security is a critical aspect of any web application, and implementing proper authentication and authorization is essential. In this guide, we'll explore how to implement JWT (JSON Web Token) authentication in Spring Boot applications.

## Table of Contents
1. [Understanding JWT](#understanding-jwt)
2. [Project Setup](#project-setup)
3. [JWT Configuration](#jwt-configuration)
4. [Authentication Implementation](#authentication-implementation)
5. [Security Configuration](#security-configuration)
6. [Testing](#testing)

## Understanding JWT

JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It consists of three parts:

1. **Header**: Contains metadata about the token
2. **Payload**: Contains the claims (user information)
3. **Signature**: Used to verify the token's authenticity

### JWT Structure

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
\`\`\`

## Project Setup

### Dependencies

Add the following dependencies to your \`pom.xml\`:

\`\`\`xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
    </dependency>
</dependencies>
\`\`\`

## JWT Configuration

### JWT Utility Class

Create a utility class for JWT operations:

\`\`\`java
@Component
public class JwtUtil {
    
    private static final String SECRET_KEY = "mySecretKey";
    private static final int JWT_EXPIRATION = 86400000; // 24 hours
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }
    
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
\`\`\`

## Authentication Implementation

### JWT Authentication Filter

Create a filter to handle JWT authentication:

\`\`\`java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        final String authorizationHeader = request.getHeader("Authorization");
        
        String username = null;
        String jwt = null;
        
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }
        
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
\`\`\`

## Security Configuration

### Security Configuration Class

Configure Spring Security to use JWT:

\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );
        
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
\`\`\`

## Testing

### Authentication Controller Test

\`\`\`java
@SpringBootTest
@AutoConfigureTestDatabase
class AuthenticationControllerTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void testLogin() {
        LoginRequest loginRequest = new LoginRequest("user@example.com", "password");
        
        ResponseEntity<LoginResponse> response = restTemplate.postForEntity(
            "/api/auth/login", 
            loginRequest, 
            LoginResponse.class
        );
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().getToken());
    }
}
\`\`\`

## Conclusion

Implementing JWT authentication in Spring Boot provides a secure, stateless way to handle user authentication. By following these patterns and best practices, you can create robust authentication systems that scale with your application.

Key takeaways:
- Use strong secret keys
- Implement proper token expiration
- Validate tokens on every request
- Handle token refresh appropriately
- Test your authentication thoroughly

Remember to keep your secret keys secure and consider using environment variables for configuration in production environments.
    `,
    date: "Dec 10, 2024",
    readTime: "12 min read",
    category: "Backend Development",
    tags: ["Spring Boot", "Java", "Security", "JWT"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    author: {
      name: "Yasas Banuka",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Full-stack developer passionate about creating scalable web applications and sharing knowledge with the community."
    }
  },
  {
    id: "react-native-mobile-development",
    title: "Mobile App Development with React Native: From Concept to Deployment",
    excerpt: "Complete walkthrough of building a cross-platform mobile application using React Native, covering development, testing, and app store deployment.",
    content: `
# Mobile App Development with React Native: From Concept to Deployment

React Native has revolutionized mobile app development by allowing developers to build cross-platform applications using JavaScript and React. In this comprehensive guide, we'll walk through the entire process from concept to deployment.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Project Setup](#project-setup)
3. [Navigation](#navigation)
4. [State Management](#state-management)
5. [Testing](#testing)
6. [Deployment](#deployment)

## Getting Started

### Prerequisites

Before starting with React Native development, ensure you have:

- Node.js (v14 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Java Development Kit (JDK)

### Installation

Install React Native CLI globally:

\`\`\`bash
npm install -g react-native-cli
\`\`\`

Create a new React Native project:

\`\`\`bash
npx react-native init MyApp
cd MyApp
\`\`\`

## Project Setup

### Project Structure

Organize your React Native project with a clear structure:

\`\`\`
src/
├── components/
│   ├── common/
│   ├── forms/
│   └── navigation/
├── screens/
├── services/
├── utils/
├── hooks/
├── store/
└── types/
\`\`\`

### Navigation Setup

Install React Navigation:

\`\`\`bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
\`\`\`

Configure navigation:

\`\`\`jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

## State Management

### Using Redux Toolkit

For complex state management, use Redux Toolkit:

\`\`\`bash
npm install @reduxjs/toolkit react-redux
\`\`\`

Create a store:

\`\`\`jsx
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
\`\`\`

### User Slice Example

\`\`\`jsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
\`\`\`

## Testing

### Unit Testing with Jest

\`\`\`jsx
import { render, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../LoginScreen';

test('renders login form correctly', () => {
  const { getByPlaceholderText, getByText } = render(<LoginScreen />);
  
  expect(getByPlaceholderText('Email')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
  expect(getByText('Login')).toBeTruthy();
});

test('handles login button press', () => {
  const mockOnLogin = jest.fn();
  const { getByText } = render(<LoginScreen onLogin={mockOnLogin} />);
  
  fireEvent.press(getByText('Login'));
  expect(mockOnLogin).toHaveBeenCalled();
});
\`\`\`

## Deployment

### Android Deployment

1. Generate a signed APK:

\`\`\`bash
cd android
./gradlew assembleRelease
\`\`\`

2. Upload to Google Play Console
3. Configure app signing
4. Submit for review

### iOS Deployment

1. Archive the app in Xcode
2. Upload to App Store Connect
3. Configure app metadata
4. Submit for review

## Conclusion

React Native provides an excellent platform for building cross-platform mobile applications. By following these best practices and patterns, you can create robust, maintainable mobile apps that work seamlessly across platforms.

Key takeaways:
- Plan your project structure carefully
- Use proper navigation patterns
- Implement comprehensive testing
- Follow platform-specific guidelines
- Optimize for performance

Happy mobile development! 📱
    `,
    date: "Dec 5, 2024",
    readTime: "15 min read",
    category: "Mobile Development",
    tags: ["React Native", "Mobile", "Cross-platform", "Deployment"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    author: {
      name: "Yasas Banuka",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Full-stack developer passionate about creating scalable web applications and sharing knowledge with the community."
    }
  },
  {
    id: "database-design-patterns",
    title: "Database Design Patterns: Optimizing Performance and Scalability",
    excerpt: "Explore different database design patterns and how to optimize your database schema for better performance and scalability in production environments.",
    content: `
# Database Design Patterns: Optimizing Performance and Scalability

Database design is a critical aspect of application development that directly impacts performance, scalability, and maintainability. In this guide, we'll explore various database design patterns and optimization techniques.

## Table of Contents
1. [Normalization vs Denormalization](#normalization-vs-denormalization)
2. [Indexing Strategies](#indexing-strategies)
3. [Partitioning](#partitioning)
4. [Caching Strategies](#caching-strategies)
5. [Query Optimization](#query-optimization)

## Normalization vs Denormalization

### Normalization Benefits

Normalization reduces data redundancy and improves data integrity:

\`\`\`sql
-- Normalized structure
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    order_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
\`\`\`

### When to Denormalize

Denormalization can improve read performance:

\`\`\`sql
-- Denormalized for read performance
CREATE TABLE order_summary (
    order_id INT PRIMARY KEY,
    user_name VARCHAR(100),
    user_email VARCHAR(100),
    total_amount DECIMAL(10,2),
    order_date DATE
);
\`\`\`

## Indexing Strategies

### Primary Indexes

\`\`\`sql
-- Primary key index (automatically created)
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2)
);
\`\`\`

### Secondary Indexes

\`\`\`sql
-- Single column index
CREATE INDEX idx_product_name ON products(name);

-- Composite index
CREATE INDEX idx_product_category_price ON products(category_id, price);

-- Partial index
CREATE INDEX idx_active_products ON products(name) WHERE active = true;
\`\`\`

## Partitioning

### Horizontal Partitioning

\`\`\`sql
-- Partition by date
CREATE TABLE orders_2024 (
    id INT,
    user_id INT,
    order_date DATE,
    amount DECIMAL(10,2)
) PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026)
);
\`\`\`

### Vertical Partitioning

\`\`\`sql
-- Split large table
CREATE TABLE user_profile (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE user_preferences (
    user_id INT PRIMARY KEY,
    theme VARCHAR(20),
    language VARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);
\`\`\`

## Caching Strategies

### Application-Level Caching

\`\`\`javascript
// Redis caching example
const redis = require('redis');
const client = redis.createClient();

async function getUser(userId) {
    // Check cache first
    const cached = await client.get(\`user:\${userId}\`);
    if (cached) {
        return JSON.parse(cached);
    }
    
    // Fetch from database
    const user = await db.users.findById(userId);
    
    // Cache for 1 hour
    await client.setex(\`user:\${userId}\`, 3600, JSON.stringify(user));
    
    return user;
}
\`\`\`

## Query Optimization

### Query Analysis

\`\`\`sql
-- Use EXPLAIN to analyze queries
EXPLAIN SELECT * FROM orders 
WHERE user_id = 123 
AND order_date > '2024-01-01';

-- Optimize with proper indexes
CREATE INDEX idx_orders_user_date ON orders(user_id, order_date);
\`\`\`

### Query Patterns

\`\`\`sql
-- Efficient pagination
SELECT * FROM products 
ORDER BY id 
LIMIT 20 OFFSET 40;

-- Use cursor-based pagination for large datasets
SELECT * FROM products 
WHERE id > 1000 
ORDER BY id 
LIMIT 20;
\`\`\`

## Conclusion

Effective database design requires balancing normalization, performance, and scalability. By implementing these patterns and strategies, you can create robust database systems that support your application's growth.

Key principles:
- Normalize for data integrity
- Denormalize for read performance
- Index strategically
- Partition large tables
- Implement caching layers
- Monitor and optimize queries

Remember to profile your database performance regularly and adjust your design based on actual usage patterns.
    `,
    date: "Nov 28, 2024",
    readTime: "10 min read",
    category: "Database",
    tags: ["Database", "Performance", "Scalability", "Design Patterns"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    author: {
      name: "Yasas Banuka",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Full-stack developer passionate about creating scalable web applications and sharing knowledge with the community."
    }
  },
  {
    id: "cloud-architecture-aws",
    title: "Cloud Architecture: Building Resilient Systems on AWS",
    excerpt: "Learn how to design and implement resilient cloud architectures using AWS services, including load balancing, auto-scaling, and disaster recovery.",
    content: `
# Cloud Architecture: Building Resilient Systems on AWS

Building resilient cloud architectures is essential for modern applications. AWS provides a comprehensive suite of services to help you create fault-tolerant, scalable systems. In this guide, we'll explore how to design and implement resilient architectures on AWS.

## Table of Contents
1. [Architecture Principles](#architecture-principles)
2. [Load Balancing](#load-balancing)
3. [Auto Scaling](#auto-scaling)
4. [Database Resilience](#database-resilience)
5. [Disaster Recovery](#disaster-recovery)

## Architecture Principles

### High Availability Design

Design for high availability using multiple Availability Zones:

\`\`\`yaml
# CloudFormation template
Resources:
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Scheme: internet-facing
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      SecurityGroups:
        - !Ref LoadBalancerSecurityGroup
\`\`\`

### Fault Tolerance

Implement fault tolerance at every layer:

\`\`\`yaml
  AutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      MinSize: 2
      MaxSize: 10
      DesiredCapacity: 3
      VPCZoneIdentifier:
        - !Ref PrivateSubnet1
        - !Ref PrivateSubnet2
        - !Ref PrivateSubnet3
      LaunchTemplate:
        LaunchTemplateId: !Ref LaunchTemplate
        Version: !GetAtt LaunchTemplate.LatestVersionNumber
\`\`\`

## Load Balancing

### Application Load Balancer

Configure ALB for application-level load balancing:

\`\`\`yaml
  TargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: app-target-group
      Port: 80
      Protocol: HTTP
      VpcId: !Ref VPC
      HealthCheckPath: /health
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 3
\`\`\`

### Health Checks

Implement comprehensive health checks:

\`\`\`javascript
// Health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      external_api: await checkExternalAPI()
    }
  };
  
  const isHealthy = Object.values(health.checks).every(check => check === 'healthy');
  
  res.status(isHealthy ? 200 : 503).json(health);
});
\`\`\`

## Auto Scaling

### Scaling Policies

Configure auto scaling policies:

\`\`\`yaml
  ScalingPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AutoScalingGroupName: !Ref AutoScalingGroup
      PolicyType: TargetTrackingScaling
      TargetTrackingConfiguration:
        TargetValue: 70.0
        PredefinedMetricSpecification:
          PredefinedMetricType: ASGAverageCPUUtilization
\`\`\`

### Custom Metrics

Implement custom scaling metrics:

\`\`\`javascript
// Custom metric for scaling
const cloudwatch = new AWS.CloudWatch();

async function publishCustomMetric(metricName, value) {
  const params = {
    Namespace: 'Application/Metrics',
    MetricData: [{
      MetricName: metricName,
      Value: value,
      Unit: 'Count',
      Timestamp: new Date()
    }]
  };
  
  await cloudwatch.putMetricData(params).promise();
}
\`\`\`

## Database Resilience

### Multi-AZ Deployment

Deploy databases across multiple AZs:

\`\`\`yaml
  Database:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: app-database
      DBInstanceClass: db.t3.micro
      Engine: mysql
      MultiAZ: true
      BackupRetentionPeriod: 7
      PreferredBackupWindow: "03:00-04:00"
      PreferredMaintenanceWindow: "sun:04:00-sun:05:00"
\`\`\`

### Read Replicas

Configure read replicas for read scaling:

\`\`\`yaml
  ReadReplica:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: app-database-replica
      SourceDBInstanceIdentifier: !Ref Database
      DBInstanceClass: db.t3.micro
\`\`\`

## Disaster Recovery

### Cross-Region Backup

Implement cross-region backup:

\`\`\`yaml
  BackupVault:
    Type: AWS::Backup::BackupVault
    Properties:
      BackupVaultName: cross-region-backup
      
  BackupPlan:
    Type: AWS::Backup::BackupPlan
    Properties:
      BackupPlan:
        BackupPlanName: daily-backup-plan
        BackupPlanRule:
          - RuleName: daily-backup
            TargetBackupVault: !Ref BackupVault
            ScheduleExpression: "cron(0 2 * * ? *)"
            Lifecycle:
              DeleteAfterDays: 30
\`\`\`

### RTO and RPO Planning

Define Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO):

\`\`\`javascript
// Disaster recovery configuration
const drConfig = {
  rto: 4 * 60 * 60 * 1000, // 4 hours
  rpo: 15 * 60 * 1000,     // 15 minutes
  
  strategies: {
    database: 'multi-az-with-read-replicas',
    application: 'multi-region-deployment',
    storage: 'cross-region-replication'
  }
};
\`\`\`

## Conclusion

Building resilient cloud architectures on AWS requires careful planning and implementation of multiple layers of redundancy. By following these patterns and best practices, you can create systems that can withstand failures and maintain high availability.

Key takeaways:
- Design for failure
- Implement redundancy at every layer
- Use auto scaling for dynamic workloads
- Plan for disaster recovery
- Monitor and test your resilience

Remember to regularly test your disaster recovery procedures and monitor your system's health to ensure continued resilience.
    `,
    date: "Nov 20, 2024",
    readTime: "14 min read",
    category: "Cloud Computing",
    tags: ["AWS", "Cloud", "Architecture", "DevOps"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    author: {
      name: "Yasas Banuka",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Full-stack developer passionate about creating scalable web applications and sharing knowledge with the community."
    }
  },
  {
    id: "future-web-development-trends",
    title: "The Future of Web Development: Trends and Technologies to Watch",
    excerpt: "An analysis of emerging trends in web development, including new frameworks, tools, and methodologies that are shaping the future of the industry.",
    content: `
# The Future of Web Development: Trends and Technologies to Watch

The web development landscape is constantly evolving, with new technologies, frameworks, and methodologies emerging regularly. In this analysis, we'll explore the trends and technologies that are shaping the future of web development.

## Table of Contents
1. [Framework Evolution](#framework-evolution)
2. [Performance Optimization](#performance-optimization)
3. [Developer Experience](#developer-experience)
4. [Emerging Technologies](#emerging-technologies)
5. [Industry Predictions](#industry-predictions)

## Framework Evolution

### Meta-Frameworks

Meta-frameworks are becoming increasingly popular:

- **Next.js**: Full-stack React framework
- **Nuxt.js**: Vue.js meta-framework
- **SvelteKit**: Svelte-based framework
- **Astro**: Multi-framework static site generator

### Example: Next.js App Router

\`\`\`jsx
// app/page.js - Next.js 13+ App Router
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Future</h1>
      <p>Server components and streaming</p>
    </div>
  );
}

// app/api/users/route.js - API routes
export async function GET() {
  const users = await fetchUsers();
  return Response.json(users);
}
\`\`\`

## Performance Optimization

### Edge Computing

Edge computing is revolutionizing web performance:

\`\`\`javascript
// Vercel Edge Functions
export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  return new Response('Hello from the edge!', {
    headers: { 'content-type': 'text/plain' },
  });
}
\`\`\`

### WebAssembly Integration

WebAssembly is enabling high-performance web applications:

\`\`\`javascript
// Loading WebAssembly module
async function loadWasmModule() {
  const wasmModule = await WebAssembly.instantiateStreaming(
    fetch('module.wasm')
  );
  
  return wasmModule.instance.exports;
}
\`\`\`

## Developer Experience

### AI-Powered Development

AI is transforming the development workflow:

\`\`\`javascript
// GitHub Copilot example
function calculateFibonacci(n) {
  // AI suggests the implementation
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}
\`\`\`

### TypeScript Evolution

TypeScript continues to evolve with new features:

\`\`\`typescript
// Template literal types
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type MouseEventName = EventName<'click'>; // 'onClick'

// Conditional types
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };
\`\`\`

## Emerging Technologies

### Web Components

Native web components are gaining traction:

\`\`\`javascript
class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.shadowRoot.innerHTML = \`
      <style>
        button {
          background: blue;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
        }
      </style>
      <button><slot></slot></button>
    \`;
  }
}

customElements.define('custom-button', CustomButton);
\`\`\`

### Progressive Web Apps (PWAs)

PWAs are becoming more sophisticated:

\`\`\`javascript
// Service Worker with advanced caching
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
\`\`\`

## Industry Predictions

### 2024-2025 Trends

1. **Server Components**: More frameworks adopting server-side rendering
2. **Edge-First Development**: Building for edge computing from the start
3. **AI Integration**: AI becoming a standard part of development tools
4. **Web3 Integration**: Blockchain and decentralized technologies
5. **Sustainability**: Green web development practices

### Technology Adoption Curve

\`\`\`javascript
// Emerging technologies timeline
const techTimeline = {
  '2024': ['Server Components', 'Edge Computing', 'AI Tools'],
  '2025': ['WebAssembly 2.0', 'Web3 Integration', 'Quantum Computing'],
  '2026': ['Brain-Computer Interfaces', 'Holographic Web', 'Neural Networks']
};
\`\`\`

## Conclusion

The future of web development is exciting and full of possibilities. As developers, we need to stay adaptable and continuously learn new technologies while maintaining focus on core principles like performance, accessibility, and user experience.

Key trends to watch:
- Meta-frameworks continue to evolve
- Edge computing becomes mainstream
- AI transforms development workflows
- Web3 and blockchain integration
- Sustainability becomes a priority

The key to success in this evolving landscape is to stay curious, experiment with new technologies, and always prioritize the user experience. The future is bright for web developers! 🚀
    `,
    date: "Nov 15, 2024",
    readTime: "6 min read",
    category: "Technology Trends",
    tags: ["Web Development", "Trends", "Future", "Innovation"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    author: {
      name: "Yasas Banuka",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Full-stack developer passionate about creating scalable web applications and sharing knowledge with the community."
    }
  }
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

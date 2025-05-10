"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Bell,
  MessageSquare,
  Heart,
  Calendar,
  User,
  Settings,
  Plus,
  Search,
  BookmarkPlus,
  Send,
  X,
  HelpCircle,
  Users,
  Star,
  Edit,
  Mail,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  ImageIcon,
  ShieldIcon,
  LogOutIcon,
  TrashIcon,
} from "lucide-react"

// =================================================================
// Mock Data
// =================================================================

// Communities data
const COMMUNITIES = [
  {
    id: 1,
    name: "Photography Enthusiasts",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    memberCount: 2453,
    description:
      "A community for photography lovers to share their work, discuss techniques, and learn from each other.",
  },
  {
    id: 2,
    name: "Book Club",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    memberCount: 1827,
    description: "Discuss your favorite books, discover new authors, and join our monthly reading challenges.",
  },
  {
    id: 3,
    name: "Hiking Adventures",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    memberCount: 3214,
    description: "Share your hiking experiences, plan group treks, and get tips for outdoor activities.",
  },
  {
    id: 4,
    name: "Cooking & Recipes",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    memberCount: 4582,
    description: "Exchange recipes, cooking techniques, and food photography with fellow cooking enthusiasts.",
  },
  {
    id: 5,
    name: "Tech Innovators",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    memberCount: 2976,
    description: "Discuss the latest in technology, share projects, and collaborate on innovative ideas.",
  },
]

// User data
const CURRENT_USER = {
  id: 1,
  name: "Parth Chauhan",
  avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  email: "parth6100@gmail.com",
  joinedDate: "2023-01-15",
  bio: "Photography enthusiast and nature lover. Always looking for new adventures!",
  location: "Portland, OR",
}

// Members data
const generateMembers = (count) => {
  const firstNames = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
    "Isabella", "Jacob", "Mia", "William", "Charlotte", "James", "Amelia",
    "Benjamin", "Harper", "Lucas", "Evelyn", "Alexander", "Abigail", "Michael",
    "Emily", "Daniel", "Elizabeth", "Matthew", "Sofia", "Henry", "Avery",
    "Jackson", "Ella", "Sebastian", "Scarlett", "Aiden", "Grace", "Owen",
    "Chloe", "Samuel", "Victoria", "David", "Riley", "Joseph", "Aria",
    "Carter", "Lily", "Wyatt", "Aubrey", "John", "Zoey", "Gabriel"
  ]

  const lastNames = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller",
    "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White",
    "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
    "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen",
    "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott",
    "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell",
    "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans",
    "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed"
  ]

  const locations = [
    "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX",
    "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA",
    "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL",
    "Fort Worth, TX", "Columbus, OH", "San Francisco, CA", "Charlotte, NC",
    "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Boston, MA",
    "Portland, OR", "Miami, FL", "Atlanta, GA", "Detroit, MI", "Minneapolis, MN"
  ]

  const bios = [
    "Photography enthusiast and nature lover.",
    "Avid reader and coffee addict.",
    "Hiking enthusiast and outdoor adventurer.",
    "Foodie and amateur chef exploring global cuisines.",
    "Tech enthusiast passionate about innovation.",
    "Musician and songwriter in my spare time.",
    "Fitness junkie and wellness advocate.",
    "Travel blogger documenting adventures around the world.",
    "Art collector and museum enthusiast.",
    "Environmental activist working on sustainability projects.",
    "Film buff with a passion for classic cinema.",
    "Yoga instructor and meditation practitioner.",
    "Craft beer connoisseur and home brewer.",
    "Volunteer animal shelter worker and pet lover.",
    "Amateur astronomer fascinated by the cosmos.",
    "Vintage fashion collector and style enthusiast.",
    "Urban gardener growing food in small spaces.",
    "History buff with a focus on ancient civilizations.",
    "DIY home improvement and interior design enthusiast.",
    "Marathon runner and endurance sports competitor."
  ]

  const interests = [
    "Photography", "Reading", "Hiking", "Cooking", "Technology",
    "Music", "Fitness", "Travel", "Art", "Environment",
    "Film", "Yoga", "Craft Beer", "Animals", "Astronomy",
    "Fashion", "Gardening", "History", "DIY", "Running"
  ]

  const members = []
  for (let i = 1; i <= count; i++) {
    const gender = Math.random() > 0.5 ? "men" : "women"
    const id = Math.floor(Math.random() * 99) + 1
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const bio = bios[Math.floor(Math.random() * bios.length)]
    const interest1 = interests[Math.floor(Math.random() * interests.length)]
    const interest2 = interests[Math.floor(Math.random() * interests.length)]

    members.push({
      id: i,
      name: `${firstName} ${lastName}`,
      avatar: `https://randomuser.me/api/portraits/${gender}/${id}.jpg`,
      joinedDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      role: Math.random() > 0.9 ? "Admin" : Math.random() > 0.8 ? "Moderator" : "Member",
      location: location,
      bio: bio,
      interests: [interest1, interest2].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
      postCount: Math.floor(Math.random() * 50) + 1,
      followersCount: Math.floor(Math.random() * 200) + 5,
      followingCount: Math.floor(Math.random() * 150) + 10,
    })
  }
  return members
}

const MEMBERS = generateMembers(50)

// Posts data
const POST_CONTENT = [
  {
    text: "Just finished reading 'The Midnight Library' by Matt Haig. Highly recommend it for anyone looking for a thought-provoking read about life choices and regrets.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Check out this sunset photo I captured yesterday at Cannon Beach! The colors were absolutely breathtaking.",
    image:
      "https://images.unsplash.com/photo-1616036740257-9449ea1f6605?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Made this delicious pasta dish last night using fresh herbs from my garden. Recipe in comments!",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Just got back from hiking Mount Hood. The views were incredible and we even spotted some wildlife!",
    image:
      "https://images.unsplash.com/photo-1592221287888-33b1929e3d33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Visited the tech conference in Seattle last weekend. So many exciting innovations on display! Particularly impressed with the new AR developments.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Does anyone have recommendations for good portrait photography locations around Portland?",
    image: null,
  },
  {
    text: "Started learning watercolor painting this month. Here's my first landscape attempt!",
    image:
      "https://images.unsplash.com/photo-1584479898061-15742e14f50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
]

const generatePosts = () => {
  const posts = []
  for (let i = 1; i <= 15; i++) {
    const randomMemberIndex = Math.floor(Math.random() * MEMBERS.length)
    const randomContentIndex = Math.floor(Math.random() * POST_CONTENT.length)
    const daysAgo = Math.floor(Math.random() * 30)
    const hoursAgo = Math.floor(Math.random() * 24)
    const minutesAgo = Math.floor(Math.random() * 60)

    const postDate = new Date()
    postDate.setDate(postDate.getDate() - daysAgo)
    postDate.setHours(postDate.getHours() - hoursAgo)
    postDate.setMinutes(postDate.getMinutes() - minutesAgo)

    posts.push({
      id: i,
      author: MEMBERS[randomMemberIndex],
      content: POST_CONTENT[randomContentIndex].text,
      image: POST_CONTENT[randomContentIndex].image,
      date: postDate,
      likes: Math.floor(Math.random() * 50),
      comments: generateComments(Math.floor(Math.random() * 5)),
      communityId: Math.floor(Math.random() * COMMUNITIES.length) + 1,
    })
  }
  return posts
}

const generateComments = (count) => {
  const commentContent = [
    "Great post! Thanks for sharing this valuable information. I've been looking for something like this.",
    "I completely agree with your perspective. It's refreshing to see someone tackle this topic so thoughtfully.",
    "Interesting perspective. I hadn't thought about it that way before. This gives me a new angle to consider.",
    "Thanks for the detailed information! This is exactly what I needed for my upcoming project.",
    "Beautiful photo! The composition and lighting are perfect. What camera setup did you use?",
    "I've been to this location too! Such an amazing place. Did you check out the trails on the north side?",
    "Could you share more details about the technique you used? I'd love to try this myself.",
    "Looking forward to more content like this! Your posts are always so informative and well-presented.",
    "This is really helpful for beginners like me. Would you consider doing a tutorial on this topic?",
    "Wow, impressive work! The attention to detail really shows. How long did this project take you?",
    "I've been struggling with this exact issue. Your solution seems elegant and straightforward.",
    "The colors in this photo are stunning! Did you use any special filters or post-processing?",
    "This reminds me of a similar experience I had last summer. It's amazing how universal these moments can be.",
    "I'm saving this post for future reference. So many good tips here that I want to remember!",
    "Have you considered exploring the alternative approach mentioned in the recent industry conference?",
    "Your consistent quality is why I follow your content. Another excellent contribution to the community!",
    "This is exactly the kind of practical advice that's often missing from theoretical discussions.",
    "The way you explained this complex topic makes it accessible even to newcomers. Well done!",
    "I tried something similar but ran into some challenges. Would love to hear how you overcame the obstacles.",
    "This perspective adds so much value to the ongoing conversation. Thanks for articulating it so clearly."
  ]

  const comments = []
  for (let i = 1; i <= count; i++) {
    const randomMemberIndex = Math.floor(Math.random() * MEMBERS.length)
    const randomContentIndex = Math.floor(Math.random() * commentContent.length)
    const hoursAgo = Math.floor(Math.random() * 24)
    const minutesAgo = Math.floor(Math.random() * 60)

    comments.push({
      id: i,
      author: MEMBERS[randomMemberIndex],
      content: commentContent[randomContentIndex],
      date: new Date(Date.now() - (hoursAgo * 3600000 + minutesAgo * 60000)),
      likes: Math.floor(Math.random() * 15),
      isEdited: Math.random() > 0.8,
      replies: Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0
    })
  }
  return comments
}

const POSTS = generatePosts()

// Events data
const EVENT_TYPES = ["Workshop", "Meetup", "Webinar", "Conference", "Social", "Exhibition", "Hackathon", "Networking", "Class", "Tour"]
const EVENT_LOCATIONS = [
  "Online (Zoom)",
  "Central Library - Meeting Room A",
  "Community Center - Main Hall",
  "Riverside Park - Picnic Area",
  "The Coffee House - Private Room",
  "Tech Hub Coworking Space",
  "Art Gallery Downtown",
  "Mountain View Trail Head",
  "Culinary Institute - Kitchen 3",
  "Innovation Center - Auditorium",
  "Botanical Gardens - East Pavilion",
  "Photography Studio - 5th Ave",
  "University Campus - Building C",
  "Waterfront Convention Center",
  "Historic Theater - Main Stage"
]

const EVENT_DESCRIPTIONS = [
  "Join us for an immersive session where we'll explore techniques, share insights, and practice hands-on with expert guidance. Suitable for all skill levels, from beginners to advanced practitioners.",
  "Connect with like-minded individuals in this interactive gathering. We'll discuss current trends, share experiences, and build meaningful connections in a relaxed and welcoming environment.",
  "This virtual event brings together industry experts who will share cutting-edge knowledge and answer your questions in real-time. Don't miss this opportunity to learn from the best in the field.",
  "A premier gathering featuring keynote speakers, panel discussions, and networking opportunities. Expand your horizons and gain valuable insights that will help you advance in your journey.",
  "Unwind and connect in this casual get-together. Enjoy refreshments, engaging conversations, and fun activities designed to help you build relationships within our community.",
  "Experience a curated showcase of outstanding work from community members. Get inspired, provide feedback, and appreciate the creativity and talent within our group.",
  "Put your skills to the test in this collaborative challenge. Form teams, solve problems, and create innovative solutions within a supportive and energetic atmosphere.",
  "Expand your professional network in this structured event designed to facilitate meaningful connections. Bring business cards and prepare your elevator pitch!",
  "A focused learning session with hands-on instruction from experienced teachers. Materials will be provided, and you'll leave with new skills and completed projects.",
  "Explore fascinating locations with knowledgeable guides who will share insights and stories. Comfortable walking shoes recommended for this enriching experience."
]

const EVENT_TITLES = [
  "Mastering Night Photography: Capturing Urban Landscapes After Dark",
  "Contemporary Fiction Book Club: 'The Midnight Library' Discussion",
  "Weekend Wilderness Adventure: Cascade Mountain Trail Exploration",
  "Mediterranean Cuisine Masterclass: From Mezze to Desserts",
  "Future of Technology: AI and Machine Learning Trends for 2023",
  "Portrait Photography Essentials: Lighting and Composition Workshop",
  "Fantasy Literature Deep Dive: Worldbuilding and Character Development",
  "Urban Hiking: Discovering Hidden Trails and City Secrets",
  "Artisanal Bread Making: Sourdough Techniques and Traditions",
  "Full-Stack Web Development: Building Your First React Application",
  "Wildlife Photography: Techniques for Capturing Animals in Natural Settings",
  "Science Fiction Book Club: Exploring Asimov's Foundation Series",
  "Rock Climbing for Beginners: Indoor Techniques and Safety",
  "Farm-to-Table Cooking: Seasonal Ingredients and Sustainable Practices",
  "Blockchain and Cryptocurrency: Understanding the Technology and Market",
  "Landscape Photography: Composition and Natural Light Techniques",
  "Historical Fiction Workshop: Research Methods for Writers",
  "Mountain Biking Basics: Trail Etiquette and Essential Skills",
  "Plant-Based Cooking: Nutritious and Delicious Meal Preparation",
  "Cybersecurity Fundamentals: Protecting Your Digital Life"
]

const generateEvents = () => {
  const events = []
  for (let i = 1; i <= 15; i++) {
    // Create events spread over the next 45 days
    const daysAhead = Math.floor(Math.random() * 45) + 1
    const hoursValue = [9, 10, 12, 14, 15, 17, 18, 19][Math.floor(Math.random() * 8)]
    const minutesValue = [0, 15, 30, 45][Math.floor(Math.random() * 4)]

    const eventDate = new Date()
    eventDate.setDate(eventDate.getDate() + daysAhead)
    eventDate.setHours(hoursValue, minutesValue, 0, 0)

    const randomTypeIndex = Math.floor(Math.random() * EVENT_TYPES.length)
    const randomLocationIndex = Math.floor(Math.random() * EVENT_LOCATIONS.length)
    const randomTitleIndex = Math.floor(Math.random() * EVENT_TITLES.length)
    const randomDescriptionIndex = Math.floor(Math.random() * EVENT_DESCRIPTIONS.length)
    const organizerIndex = Math.floor(Math.random() * MEMBERS.length)
    const duration = [60, 90, 120, 150, 180][Math.floor(Math.random() * 5)]
    const maxAttendees = [15, 20, 25, 30, 50, 100][Math.floor(Math.random() * 6)]
    const currentAttendees = Math.floor(Math.random() * (maxAttendees - 5)) + 5
    const isFeatured = Math.random() > 0.7
    const price = Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : 0
    const tags = [
      ["photography", "night", "urban", "creative"],
      ["books", "reading", "discussion", "literature"],
      ["hiking", "outdoors", "nature", "adventure"],
      ["cooking", "food", "culinary", "mediterranean"],
      ["technology", "ai", "innovation", "future"],
      ["photography", "portrait", "workshop", "creative"],
      ["books", "fantasy", "writing", "literature"],
      ["hiking", "urban", "exploration", "fitness"],
      ["cooking", "baking", "food", "artisanal"],
      ["technology", "web", "development", "coding"]
    ][Math.floor(Math.random() * 10)]

    events.push({
      id: i,
      title: EVENT_TITLES[randomTitleIndex],
      type: EVENT_TYPES[randomTypeIndex],
      date: eventDate,
      endTime: new Date(eventDate.getTime() + duration * 60000),
      location: EVENT_LOCATIONS[randomLocationIndex],
      isOnline: EVENT_LOCATIONS[randomLocationIndex].includes("Online"),
      attendees: currentAttendees,
      maxAttendees: maxAttendees,
      description: EVENT_DESCRIPTIONS[randomDescriptionIndex] +
        `\n\nAbout "${EVENT_TITLES[randomTitleIndex]}": This ${EVENT_TYPES[randomTypeIndex].toLowerCase()} will focus on ${EVENT_TITLES[randomTitleIndex].toLowerCase()}. Whether you're just starting out or looking to refine your skills, you'll find value in this event.`,
      organizer: MEMBERS[organizerIndex],
      communityId: Math.floor(Math.random() * COMMUNITIES.length) + 1,
      isFeatured: isFeatured,
      price: price,
      currency: "USD",
      tags: tags,
      attendeesList: Array.from({length: currentAttendees}, () => MEMBERS[Math.floor(Math.random() * MEMBERS.length)]),
      status: Math.random() > 0.1 ? "active" : "cancelled"
    })
  }

  // Sort events by date
  return events.sort((a, b) => a.date.getTime() - b.date.getTime())
}

const EVENTS = generateEvents()

// Analytics data for charts
const MEMBER_GROWTH = [
  { month: "Jan", count: 1250 },
  { month: "Feb", count: 1400 },
  { month: "Mar", count: 1800 },
  { month: "Apr", count: 2100 },
  { month: "May", count: 2400 },
  { month: "Jun", count: 2700 },
]

const ACTIVITY_DATA = [
  { name: "Posts", value: 352, description: "New content shared by community members", trend: "+12% from last month" },
  { name: "Comments", value: 875, description: "Responses to posts and discussions", trend: "+23% from last month" },
  { name: "Events", value: 124, description: "Scheduled meetups and activities", trend: "+8% from last month" },
  { name: "New Members", value: 243, description: "Recently joined community members", trend: "+15% from last month" },
  { name: "Reactions", value: 1247, description: "Likes and other engagement actions", trend: "+18% from last month" },
]

// Enhanced color palette with gradients for charts
const COLORS = ["#8b5cf6", "#6366f1", "#ec4899", "#14b8a6"]
const GRADIENTS = [
  ["#8b5cf6", "#6d28d9"], // purple gradient
  ["#6366f1", "#4f46e5"], // indigo gradient
  ["#ec4899", "#db2777"], // pink gradient
  ["#14b8a6", "#0d9488"]  // teal gradient
]

// Notifications data
const generateNotifications = () => {
  const notificationTypes = ["like", "comment", "mention", "event", "new_member"]
  const notifications = []

  for (let i = 1; i <= 8; i++) {
    const typeIndex = Math.floor(Math.random() * notificationTypes.length)
    const type = notificationTypes[typeIndex]
    const minutesAgo = Math.floor(Math.random() * 120)

    let content = ""
    const actor = MEMBERS[Math.floor(Math.random() * MEMBERS.length)]

    switch (type) {
      case "like":
        content = `${actor.name} liked your post`
        break
      case "comment":
        content = `${actor.name} commented on your post`
        break
      case "mention":
        content = `${actor.name} mentioned you in a comment`
        break
      case "event":
        content = `New event scheduled in a community you follow`
        break
      case "new_member":
        content = `${actor.name} joined a community you're in`
        break
      default:
        content = `New notification from ${actor.name}`
    }

    notifications.push({
      id: i,
      type,
      content,
      actor,
      date: new Date(Date.now() - minutesAgo * 60000),
      read: Math.random() > 0.6,
    })
  }

  return notifications.sort((a, b) => b.date.getTime() - a.date.getTime())
}

const NOTIFICATIONS = generateNotifications()

// =================================================================
// Main Component
// =================================================================

const CommunityHub = () => {
  const [activeCommunity, setActiveCommunity] = useState(COMMUNITIES[0])
  const [activeView, setActiveView] = useState("feed")
  const [joinedCommunities, setJoinedCommunities] = useState([1, 3]) // IDs of communities the user has joined
  const [posts, setPosts] = useState(POSTS)
  const [events, setEvents] = useState(EVENTS)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostImage, setNewPostImage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePost, setActivePost] = useState(null)
  const [newCommentContent, setNewCommentContent] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [showEventDetails, setShowEventDetails] = useState(null)
  const notificationsRef = useRef(null)

  // Filter posts by active community
  const communityPosts = posts.filter((post) => post.communityId === activeCommunity.id)

  // Filter events by active community
  const communityEvents = events.filter((event) => event.communityId === activeCommunity.id)

  // Handle post like
  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          // Toggle like
          const newLikes = post.likes + 1
          // Create notification for post author
          if (post.author.id !== CURRENT_USER.id) {
            const newNotification = {
              id: notifications.length + 1,
              type: "like",
              content: `${CURRENT_USER.name} liked your post`,
              actor: CURRENT_USER,
              date: new Date(),
              read: false,
            }
            setNotifications([newNotification, ...notifications])
          }
          return { ...post, likes: newLikes }
        }
        return post
      }),
    )
  }

  // Handle community join/leave
  const handleJoinCommunity = (communityId) => {
    if (joinedCommunities.includes(communityId)) {
      setJoinedCommunities(joinedCommunities.filter((id) => id !== communityId))
    } else {
      setJoinedCommunities([...joinedCommunities, communityId])
      // Create notification for community members
      const newNotification = {
        id: notifications.length + 1,
        type: "new_member",
        content: `${CURRENT_USER.name} joined ${COMMUNITIES.find((c) => c.id === communityId).name}`,
        actor: CURRENT_USER,
        date: new Date(),
        read: false,
      }
      setNotifications([newNotification, ...notifications])
    }
  }

  // Handle creating new post
  const handleCreatePost = (e) => {
    e.preventDefault()
    if (newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: CURRENT_USER,
        content: newPostContent,
        image: newPostImage || null,
        date: new Date(),
        likes: 0,
        comments: [],
        communityId: activeCommunity.id,
      }
      setPosts([newPost, ...posts])
      setNewPostContent("")
      setNewPostImage("")

      // Create notification for community members
      const newNotification = {
        id: notifications.length + 1,
        type: "new_post",
        content: `New post in ${activeCommunity.name}`,
        actor: CURRENT_USER,
        date: new Date(),
        read: false,
      }
      setNotifications([newNotification, ...notifications])
    }
  }

  // Handle comment submit
  const handleCommentSubmit = (postId) => {
    if (newCommentContent.trim()) {
      const newComment = {
        id: Math.max(...posts.find((p) => p.id === postId).comments.map((c) => c.id), 0) + 1,
        author: CURRENT_USER,
        content: newCommentContent,
        date: new Date(),
      }

      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            // Create notification for post author
            if (post.author.id !== CURRENT_USER.id) {
              const newNotification = {
                id: notifications.length + 1,
                type: "comment",
                content: `${CURRENT_USER.name} commented on your post`,
                actor: CURRENT_USER,
                date: new Date(),
                read: false,
              }
              setNotifications([newNotification, ...notifications])
            }
            return { ...post, comments: [...post.comments, newComment] }
          }
          return post
        }),
      )

      setNewCommentContent("")
    }
  }

  // Handle mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notification) => {
        if (notification.id === notificationId) {
          return { ...notification, read: true }
        }
        return notification
      }),
    )
  }

  // Handle mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [notificationsRef])

  // Format date for display
  const formatDate = (date) => {
    const now = new Date()
    const diffMs = now - new Date(date)
    const diffMins = Math.round(diffMs / 60000)
    const diffHrs = Math.round(diffMs / 3600000)
    const diffDays = Math.round(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHrs < 24) {
      return `${diffHrs}h ago`
    } else if (diffDays < 30) {
      return `${diffDays}d ago`
    } else {
      return new Date(date).toLocaleDateString()
    }
  }

  // Format event date
  const formatEventDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Generate random image URL for new post preview
  const handleGenerateRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000)
    setNewPostImage(`https://picsum.photos/800/500?random=${randomId}`)
  }

  // Open modal with specified content
  const openModal = (content) => {
    setModalContent(content)
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setActiveCommunity(COMMUNITIES[0])
                  setActiveView("feed")
                }}
                className="cursor-pointer"
              >
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                  ParthThreads
                </h1>
              </motion.div>

              <div className="hidden md:flex items-center space-x-6 ml-8">
                <button
                  onClick={() => openModal("explorer")}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Explore
                </button>
                <button
                  onClick={() => openModal("events")}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Events
                </button>
                <button
                  onClick={() => openModal("about")}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  About
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search communities..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white w-48 lg:w-64 transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 relative transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  {notifications.some((n) => !n.read) && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {showNotifications && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-30"
                    >
                      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-purple-600 hover:text-purple-800"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-purple-50" : ""}`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="flex items-start">
                                <img
                                  src={notification.actor.avatar || "/placeholder.svg"}
                                  alt={notification.actor.name}
                                  className="h-10 w-10 rounded-full mr-3"
                                />
                                <div>
                                  <p className="text-sm text-gray-800">{notification.content}</p>
                                  <p className="text-xs text-gray-500 mt-1">{formatDate(notification.date)}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </button>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-4 top-16 bg-white shadow-lg rounded-lg border border-gray-200 w-56 py-2 z-30"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <img
                          src={CURRENT_USER.avatar || "/placeholder.svg"}
                          alt={CURRENT_USER.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium text-sm">{CURRENT_USER.name}</p>
                          <p className="text-xs text-gray-500">{CURRENT_USER.email}</p>
                        </div>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <button
                          onClick={() => openModal("profile")}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex w-full items-center"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => openModal("account")}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex w-full items-center"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Account Settings
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => openModal("help")}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex w-full items-center"
                        >
                          <HelpCircle className="h-4 w-4 mr-2" />
                          Help Center
                        </button>
                      </li>
                      <li className="border-t border-gray-100 mt-2">
                        <button
                          onClick={() => openModal("logout")}
                          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex w-full items-center"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="flex items-center">
                <img
                  src={CURRENT_USER.avatar || "/placeholder.svg"}
                  alt={CURRENT_USER.name}
                  className="h-8 w-8 rounded-full"
                />
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden py-3 border-t border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={CURRENT_USER.avatar || "/placeholder.svg"}
                    alt={CURRENT_USER.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{CURRENT_USER.name}</p>
                    <p className="text-xs text-gray-500">{CURRENT_USER.email}</p>
                  </div>
                </div>

                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search communities..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="bg-gray-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white w-full transition-all"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      openModal("explorer")
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center p-3 w-full rounded-md hover:bg-gray-50"
                  >
                    <Search className="h-5 w-5 mr-3 text-gray-500" />
                    Explore
                  </button>

                  <button
                    onClick={() => {
                      openModal("events")
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center p-3 w-full rounded-md hover:bg-gray-50"
                  >
                    <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                    Events
                  </button>

                  <button
                    onClick={() => {
                      openModal("profile")
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center p-3 w-full rounded-md hover:bg-gray-50"
                  >
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      openModal("settings")
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center p-3 w-full rounded-md hover:bg-gray-50"
                  >
                    <Settings className="h-5 w-5 mr-3 text-gray-500" />
                    Settings
                  </button>

                  <button
                    onClick={() => {
                      openModal("about")
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center p-3 w-full rounded-md hover:bg-gray-50"
                  >
                    <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
                    About
                  </button>

                  <div className="pt-3 border-t border-gray-200">
                    <button
                      onClick={() => openModal("logout")}
                      className="flex items-center p-3 w-full text-red-600 rounded-md hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar (Communities) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <h2 className="font-semibold text-gray-800 mb-4">Communities</h2>
              <div className="space-y-3">
                {COMMUNITIES.map((community) => (
                  <motion.button
                    key={community.id}
                    onClick={() => setActiveCommunity(community)}
                    className={`flex items-center w-full p-2 rounded-md transition-colors ${
                      activeCommunity.id === community.id ? "bg-purple-100 text-purple-800" : "hover:bg-gray-100"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={community.image || "/placeholder.svg"}
                        alt={community.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    </div>
                    <div className="ml-3 text-left overflow-hidden">
                      <p className="font-medium text-sm truncate">{community.name}</p>
                      <p className="text-xs text-gray-500">{community.memberCount.toLocaleString()} members</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => openModal("createCommunity")}
                  className="flex items-center justify-center w-full py-2 px-4 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Community
                </button>
              </div>
            </div>
          </div>

          {/* Main Feed / Content Area */}
          <div className="lg:col-span-2">
            {/* Community Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={activeCommunity.image || "/placeholder.svg"}
                    alt={activeCommunity.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <h1 className="text-xl font-bold text-gray-900">{activeCommunity.name}</h1>
                    <p className="text-gray-600 mt-1">{activeCommunity.description}</p>
                    <div className="flex items-center mt-2">
                      <Users className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">
                        {activeCommunity.memberCount.toLocaleString()} members
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => handleJoinCommunity(activeCommunity.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    joinedCommunities.includes(activeCommunity.id)
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {joinedCommunities.includes(activeCommunity.id) ? "Joined" : "Join"}
                </motion.button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mt-6">
                <button
                  onClick={() => setActiveView("feed")}
                  className={`pb-3 px-4 font-medium text-sm ${
                    activeView === "feed"
                      ? "border-b-2 border-purple-600 text-purple-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Posts
                </button>
                <button
                  onClick={() => setActiveView("events")}
                  className={`pb-3 px-4 font-medium text-sm ${
                    activeView === "events"
                      ? "border-b-2 border-purple-600 text-purple-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Events
                </button>
                <button
                  onClick={() => setActiveView("members")}
                  className={`pb-3 px-4 font-medium text-sm ${
                    activeView === "members"
                      ? "border-b-2 border-purple-600 text-purple-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Members
                </button>
                <button
                  onClick={() => setActiveView("about")}
                  className={`pb-3 px-4 font-medium text-sm ${
                    activeView === "about"
                      ? "border-b-2 border-purple-600 text-purple-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  About
                </button>
              </div>
            </motion.div>

            {/* Content based on active view */}
            {activeView === "feed" && (
              <>
                {/* Create Post */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
                >
                  <form onSubmit={handleCreatePost}>
                    <div className="flex items-start">
                      <img
                        src={CURRENT_USER.avatar || "/placeholder.svg"}
                        alt={CURRENT_USER.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <textarea
                          placeholder={`What's on your mind, ${CURRENT_USER.name.split(" ")[0]}?`}
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                          rows={3}
                        />

                        {newPostImage && (
                          <div className="relative mt-2">
                            <img
                              src={newPostImage || "/placeholder.svg"}
                              alt="Post preview"
                              className="w-full h-48 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => setNewPostImage("")}
                              className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}

                        <div className="flex justify-between mt-3">
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={handleGenerateRandomImage}
                              className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
                            >
                              <ImageIcon className="h-4 w-4 mr-1" />
                              Photo
                            </button>
                          </div>
                          <motion.button
                            type="submit"
                            disabled={!newPostContent.trim()}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium ${
                              !newPostContent.trim()
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-purple-600 text-white hover:bg-purple-700"
                            }`}
                            whileHover={newPostContent.trim() ? { scale: 1.05 } : {}}
                            whileTap={newPostContent.trim() ? { scale: 0.95 } : {}}
                          >
                            Post
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </form>
                </motion.div>

                {/* Posts */}
                <div className="space-y-6">
                  {communityPosts.length > 0 ? (
                    communityPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      >
                        <div className="p-4">
                          <div className="flex items-start">
                            <img
                              src={post.author.avatar || "/placeholder.svg"}
                              alt={post.author.name}
                              className="h-10 w-10 rounded-full mr-3"
                            />
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                                <span className="mx-1.5 text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                              </div>
                              <p className="mt-2 text-gray-800">{post.content}</p>
                            </div>
                          </div>

                          {post.image && (
                            <div className="mt-3">
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt="Post"
                                className="w-full h-auto rounded-md"
                              />
                            </div>
                          )}

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <motion.button
                                onClick={() => handleLike(post.id)}
                                className="flex items-center text-gray-500 hover:text-purple-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Heart
                                  className={`h-5 w-5 mr-1.5 ${post.likes > 0 ? "text-red-500 fill-red-500" : ""}`}
                                />
                                <span>{post.likes}</span>
                              </motion.button>
                              <button
                                onClick={() => setActivePost(activePost === post.id ? null : post.id)}
                                className="flex items-center text-gray-500 hover:text-purple-600"
                              >
                                <MessageSquare className="h-5 w-5 mr-1.5" />
                                <span>{post.comments.length}</span>
                              </button>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700">
                              <BookmarkPlus className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {/* Comments Section */}
                        {activePost === post.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gray-100 bg-gray-50 p-4"
                          >
                            {post.comments.length > 0 ? (
                              <div className="space-y-4 mb-4">
                                {post.comments.map((comment) => (
                                  <div key={comment.id} className="flex items-start">
                                    <img
                                      src={comment.author.avatar || "/placeholder.svg"}
                                      alt={comment.author.name}
                                      className="h-8 w-8 rounded-full mr-2"
                                    />
                                    <div className="bg-white p-3 rounded-lg shadow-sm flex-1">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="font-medium text-sm">{comment.author.name}</span>
                                        <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                                      </div>
                                      <p className="text-sm text-gray-800">{comment.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 text-center py-2">
                                No comments yet. Be the first to comment!
                              </p>
                            )}

                            <div className="flex items-start mt-4">
                              <img
                                src={CURRENT_USER.avatar || "/placeholder.svg"}
                                alt={CURRENT_USER.name}
                                className="h-8 w-8 rounded-full mr-2"
                              />
                              <div className="flex-1 relative">
                                <textarea
                                  placeholder="Write a comment..."
                                  value={newCommentContent}
                                  onChange={(e) => setNewCommentContent(e.target.value)}
                                  className="w-full border border-gray-200 rounded-md py-2 px-3 pr-10 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                                  rows={1}
                                />
                                <button
                                  onClick={() => handleCommentSubmit(post.id)}
                                  disabled={!newCommentContent.trim()}
                                  className={`absolute right-2 top-2 ${!newCommentContent.trim() ? "text-gray-300 cursor-not-allowed" : "text-purple-600 hover:text-purple-800"}`}
                                >
                                  <Send className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                      <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium text-gray-800">No posts yet</h3>
                      <p className="text-gray-500 mt-1">Be the first to post in this community!</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeView === "events" && (
              <div className="space-y-6">
                {showEventDetails ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <button
                        onClick={() => setShowEventDetails(null)}
                        className="flex items-center text-gray-600 hover:text-purple-600"
                      >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to events
                      </button>
                    </div>

                    <h1 className="text-xl font-bold text-gray-900 mt-2">{showEventDetails.title}</h1>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <div className="flex items-center mb-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-md">
                            {showEventDetails.type}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="flex items-center text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            {formatEventDate(showEventDetails.date)}
                          </span>
                        </div>

                        <div className="prose">
                          <p className="text-gray-700">{showEventDetails.description}</p>

                          <h2 className="text-lg font-semibold mt-6 mb-3">Location</h2>
                          <div className="flex items-center bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="text-gray-700">
                              <p className="font-medium">{showEventDetails.location}</p>
                              {showEventDetails.location === "Online" ? (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">Meeting link will be shared with attendees</p>
                                  <button className="mt-2 flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium">
                                    <ExternalLink className="h-3 w-3 mr-1.5" />
                                    Join Meeting
                                  </button>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Details will be shared with attendees</p>
                              )}
                            </div>
                          </div>

                          <h2 className="text-lg font-semibold mt-6 mb-3">Organizer</h2>
                          <div className="flex items-center">
                            <img
                              src={showEventDetails.organizer.avatar || "/placeholder.svg"}
                              alt={showEventDetails.organizer.name}
                              className="h-10 w-10 rounded-full mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-800">{showEventDetails.organizer.name}</p>
                              <p className="text-xs text-gray-500">{showEventDetails.organizer.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                          <h3 className="font-semibold text-gray-800 mb-3">Event Details</h3>
                          <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                              <div>
                                <p className="text-gray-600 font-medium">Date & Time</p>
                                <p className="text-gray-800">{formatEventDate(showEventDetails.date)}</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Users className="h-5 w-5 mr-2 text-gray-500" />
                              <div>
                                <p className="text-gray-600 font-medium">Attendees</p>
                                <p className="text-gray-800">{showEventDetails.attendees} going</p>
                              </div>
                            </li>
                          </ul>

                          <div className="mt-6">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full py-2.5 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors"
                            >
                              Join Event
                            </motion.button>
                            <button className="w-full mt-2 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors">
                              Add to Calendar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                      <button
                        onClick={() => openModal("createEvent")}
                        className="flex items-center text-sm text-purple-600 hover:text-purple-800"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Create Event
                      </button>
                    </div>

                    {communityEvents.length > 0 ? (
                      <div className="space-y-4">
                        {communityEvents.map((event) => (
                          <motion.div
                            key={event.id}
                            onClick={() => setShowEventDetails(event)}
                            whileHover={{ scale: 1.01 }}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex cursor-pointer"
                          >
                            <div className="mr-4 flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center bg-purple-100 rounded-lg text-purple-800">
                              <span className="font-bold text-lg">{event.date.getDate()}</span>
                              <span className="text-xs">
                                {new Date(event.date).toLocaleString("default", { month: "short" })}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium text-gray-900">{event.title}</h3>
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-md">
                                  {event.type}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1.5" />
                                {formatEventDate(event.date)}
                                <span className="mx-2">•</span>
                                {event.location}
                              </div>
                              <div className="mt-2 flex items-center">
                                <span className="text-sm text-gray-500">{event.attendees} attending</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <h3 className="text-lg font-medium text-gray-800">No upcoming events</h3>
                        <p className="text-gray-500 mt-1">Create an event for this community!</p>
                        <button
                          onClick={() => openModal("createEvent")}
                          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                          Create Event
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeView === "members" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Members</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search members..."
                      className="bg-gray-100 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white w-48 transition-all"
                    />
                    <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {MEMBERS.slice(0, 12).map((member) => (
                    <motion.div
                      key={member.id}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center p-3 rounded-md hover:bg-gray-50"
                    >
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{member.name}</h3>
                          {member.role !== "Member" && (
                            <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-md">
                              {member.role}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          Joined {new Date(member.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {MEMBERS.length > 12 && (
                  <div className="mt-6 text-center">
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                      View all {MEMBERS.length} members
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeView === "about" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">About this Community</h2>
                <p className="text-gray-700">{activeCommunity.description}</p>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Community Stats</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-md p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">{activeCommunity.memberCount}</p>
                      <p className="text-xs text-gray-500 mt-1">Members</p>
                    </div>
                    <div className="bg-gray-50 rounded-md p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {posts.filter((p) => p.communityId === activeCommunity.id).length}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Posts</p>
                    </div>
                    <div className="bg-gray-50 rounded-md p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {events.filter((e) => e.communityId === activeCommunity.id).length}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Events</p>
                    </div>
                    <div className="bg-gray-50 rounded-md p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">{Math.floor(Math.random() * 24) + 1}</p>
                      <p className="text-xs text-gray-500 mt-1">Online now</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Community Growth</h3>
                  <div className="h-64 bg-gray-50 p-4 rounded-md">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MEMBER_GROWTH}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECEF" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Admins & Moderators</h3>
                  <div className="space-y-3">
                    {MEMBERS.filter((member) => member.role !== "Member")
                      .slice(0, 3)
                      .map((member) => (
                        <div key={member.id} className="flex items-center">
                          <img
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                            className="h-8 w-8 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{member.name}</p>
                            <p className="text-xs text-purple-600">{member.role}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500">Created on Jan 15, 2023</p>
                    <button
                      onClick={() => openModal("communitySettings")}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      Community Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Community Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-800">Community Activity</h2>
                  <motion.div
                    className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Last 30 days
                  </motion.div>
                </div>
                <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        {GRADIENTS.map((gradient, index) => (
                          <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={gradient[0]} stopOpacity={1} />
                            <stop offset="100%" stopColor={gradient[1]} stopOpacity={1} />
                          </linearGradient>
                        ))}
                        {/* Add radial gradients for more depth */}
                        {GRADIENTS.map((gradient, index) => (
                          <radialGradient key={`radialGradient-${index}`} id={`radialGradient-${index}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor={gradient[0]} stopOpacity={1} />
                            <stop offset="100%" stopColor={gradient[1]} stopOpacity={0.9} />
                          </radialGradient>
                        ))}
                      </defs>
                      <Pie
                        data={ACTIVITY_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1800}
                        label={({ name, percent }) => {
                          return `${name.substring(0, 6)}.. ${(percent * 100).toFixed(0)}%`
                        }}
                        labelLine={false}
                        strokeWidth={2}
                      >
                        {ACTIVITY_DATA.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#radialGradient-${index % GRADIENTS.length})`}
                            stroke={COLORS[index % COLORS.length]}
                            strokeWidth={1}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} activities`, name]}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.98)',
                          borderRadius: '12px',
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
                          border: 'none',
                          padding: '10px 14px',
                          fontWeight: 500
                        }}
                        itemStyle={{ color: '#4B5563', padding: '4px 0' }}
                        labelStyle={{ fontWeight: 'bold', color: '#1F2937', marginBottom: '6px' }}
                        animationDuration={300}
                        animationEasing="ease-out"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center content overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      className="bg-white bg-opacity-80 rounded-full h-20 w-20 flex flex-col items-center justify-center shadow-sm"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                    >
                      <span className="text-lg font-bold text-purple-700">
                        {ACTIVITY_DATA.reduce((sum, item) => sum + item.value, 0)}
                      </span>
                      <span className="text-xs text-gray-600">Total</span>
                    </motion.div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  {ACTIVITY_DATA.map((item, index) => (
                    <motion.div
                      key={`legend-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 * index, duration: 0.4 }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(249, 250, 251, 0.8)",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.05)"
                      }}
                      className="flex items-start p-3 rounded-md border border-gray-100 bg-white"
                    >
                      <div
                        className="w-5 h-5 rounded-full mr-3 flex-shrink-0 mt-0.5"
                        style={{ background: `linear-gradient(135deg, ${GRADIENTS[index % GRADIENTS.length][0]}, ${GRADIENTS[index % GRADIENTS.length][1]})` }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-800">{item.name}</span>
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{item.trend}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-lg font-bold text-gray-900">{item.value.toLocaleString()}</span>
                          <span className="ml-1 text-xs text-gray-500">activities</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.value / Math.max(...ACTIVITY_DATA.map(d => d.value))) * 100}%` }}
                            transition={{ delay: 0.3 + (0.1 * index), duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(to right, ${GRADIENTS[index % GRADIENTS.length][0]}, ${GRADIENTS[index % GRADIENTS.length][1]})` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-800">Upcoming Events</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveView("events")}
                    className="text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 px-2 py-1 rounded-full font-medium transition-colors"
                  >
                    View all
                  </motion.button>
                </div>

                {communityEvents.length > 0 ? (
                  <div className="space-y-3">
                    {communityEvents.slice(0, 3).map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 * index }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
                        }}
                        onClick={() => {
                          setActiveView("events")
                          setShowEventDetails(event)
                        }}
                        className="flex items-start p-3 border border-gray-100 cursor-pointer rounded-md bg-white"
                      >
                        <motion.div
                          className="mr-3 flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 rounded-md text-white shadow-sm"
                          whileHover={{
                            boxShadow: "0 4px 8px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                          }}
                        >
                          <span className="font-bold text-lg">{event.date.getDate()}</span>
                          <span className="text-xs font-medium">
                            {new Date(event.date).toLocaleString("default", { month: "short" })}
                          </span>
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-800">{event.title}</h3>
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full ml-2">
                              {event.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <Calendar className="h-3 w-3 mr-1 inline" />
                            {formatEventDate(event.date)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <Users className="h-3 w-3 mr-1 inline" />
                            {event.attendees} attending
                          </p>
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.2 }}
                            className="h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 mt-2 origin-left"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8 px-4 border border-dashed border-gray-200 rounded-lg"
                  >
                    <Calendar className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-medium text-gray-600">No upcoming events</p>
                    <p className="text-xs text-gray-500 mt-1">Check back later or create a new event</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal("createEvent")}
                      className="mt-4 px-4 py-2 bg-purple-600 text-white text-sm rounded-md font-medium hover:bg-purple-700"
                    >
                      Create Event
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              {/* Top Contributors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-800">Top Contributors</h2>
                  <motion.div
                    className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    This month
                  </motion.div>
                </div>
                <div className="space-y-3">
                  {MEMBERS.slice(0, 5).map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
                      }}
                      className="flex items-center p-3 rounded-md border border-gray-100 bg-white"
                    >
                      <div className="relative">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-white shadow-sm">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 ml-3">
                        <p className="font-medium text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                      <motion.div
                        className="flex flex-col items-end"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm ml-1 font-bold text-yellow-700">{Math.floor(Math.random() * 500) + 50}</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">contribution points</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                  <button
                    className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors"
                    onClick={() => openModal("allContributors")}
                  >
                    View all contributors
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">ParthThreads</h3>
              <p className="text-sm text-gray-600">Connect with like-minded people in vibrant communities.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => openModal("about")}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("careers")}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("blog")}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => openModal("help")}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("guidelines")}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Community Guidelines
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("privacy")}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  support@ParthThreads.com
                </li>
              </ul>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => openModal("social-twitter")}
                  className="p-2 bg-gray-200 rounded-full hover:bg-purple-100 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </button>
                <button
                  onClick={() => openModal("social-instagram")}
                  className="p-2 bg-gray-200 rounded-full hover:bg-purple-100 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </button>
                <button
                  onClick={() => openModal("social-facebook")}
                  className="p-2 bg-gray-200 rounded-full hover:bg-purple-100 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2023 ParthThreads. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <button
                onClick={() => openModal("privacy")}
                className="text-xs text-gray-600 hover:text-purple-600"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openModal("terms")}
                className="text-xs text-gray-600 hover:text-purple-600"
              >
                Terms of Service
              </button>
              <button
                onClick={() => openModal("cookies")}
                className="text-xs text-gray-600 hover:text-purple-600"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {modalContent === "explorer" && "Explore Communities"}
                  {modalContent === "events" && "All Events"}
                  {modalContent === "about" && "About ParthThreads"}
                  {modalContent === "profile" && "Your Profile"}
                  {modalContent === "account" && "Account Settings"}
                  {modalContent === "help" && "Help Center"}
                  {modalContent === "createCommunity" && "Create a Community"}
                  {modalContent === "createEvent" && "Create an Event"}
                  {modalContent === "communitySettings" && "Community Settings"}
                  {modalContent === "logout" && "Sign Out"}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                {/* Modal Content */}
                {modalContent === "explorer" && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Discover communities based on your interests.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {COMMUNITIES.map((community) => (
                        <motion.div
                          key={community.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex items-start">
                            <img
                              src={community.image || "/placeholder.svg"}
                              alt={community.name}
                              className="h-12 w-12 rounded-md object-cover mr-3"
                            />
                            <div>
                              <h3 className="font-medium">{community.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {community.memberCount.toLocaleString()} members
                              </p>
                              <button
                                onClick={() => {
                                  setActiveCommunity(community)
                                  handleJoinCommunity(community.id)
                                  setShowModal(false)
                                }}
                                className={`mt-2 px-3 py-1 text-xs font-medium rounded-md ${
                                  joinedCommunities.includes(community.id)
                                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    : "bg-purple-600 text-white hover:bg-purple-700"
                                }`}
                              >
                                {joinedCommunities.includes(community.id) ? "Joined" : "Join"}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {modalContent === "events" && (
                  <div className="space-y-4">
                    <div className="flex justify-between mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search events..."
                          className="bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                      <button
                        onClick={() => {
                          setModalContent("createEvent")
                        }}
                        className="flex items-center text-sm bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Create Event
                      </button>
                    </div>

                    <div className="space-y-3">
                      {EVENTS.slice(0, 5).map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                        >
                          <div className="mr-3 flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center bg-purple-100 rounded-md text-purple-800">
                            <span className="font-bold text-lg">{event.date.getDate()}</span>
                            <span className="text-xs">
                              {new Date(event.date).toLocaleString("default", { month: "short" })}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatEventDate(event.date)} • {event.location}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="flex items-center text-xs text-gray-500">
                                <Users className="h-3 w-3 mr-1" />
                                {event.attendees} attending
                              </span>
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                                {event.type}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {modalContent === "about" && (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      ParthThreads is a platform for building communities and connecting with people who share your
                      interests. Create or join communities, share posts, attend events, and engage with like-minded
                      individuals.
                    </p>

                    <h3 className="font-medium text-gray-900 mt-6">Features</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Create and join interest-based communities</li>
                      <li>Share posts, photos, and updates with community members</li>
                      <li>Engage through comments and likes</li>
                      <li>Organize and attend community events</li>
                      <li>Connect with other members who share your interests</li>
                    </ul>

                    <div className="flex justify-center mt-6">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700">
                        Learn More
                      </button>
                    </div>
                  </div>
                )}

                {modalContent === "profile" && (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <img
                          src={CURRENT_USER.avatar || "/placeholder.svg"}
                          alt={CURRENT_USER.name}
                          className="h-24 w-24 rounded-full object-cover"
                        />
                        <button className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1.5 shadow-md hover:bg-purple-700">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                      <h3 className="font-bold mt-4">{CURRENT_USER.name}</h3>
                      <p className="text-sm text-gray-500">Member since {CURRENT_USER.joinedDate}</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Bio</h3>
                      <p className="text-gray-600">{CURRENT_USER.bio}</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">My Communities</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {COMMUNITIES.filter((community) => joinedCommunities.includes(community.id)).map(
                          (community) => (
                            <div key={community.id} className="flex items-center p-2 border border-gray-200 rounded-md">
                              <img
                                src={community.image || "/placeholder.svg"}
                                alt={community.name}
                                className="h-8 w-8 rounded-md object-cover mr-2"
                              />
                              <p className="text-sm truncate">{community.name}</p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {modalContent === "account" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        defaultValue={CURRENT_USER.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        defaultValue={CURRENT_USER.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        defaultValue={CURRENT_USER.location}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Bio</label>
                      <textarea
                        defaultValue={CURRENT_USER.bio}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={3}
                      />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {modalContent === "help" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">How do I join a community?</h3>
                      <p className="text-sm text-gray-600">
                        Browse communities using the Explorer or search for specific topics. Click the "Join" button on
                        any community page to become a member.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">How do I create a post?</h3>
                      <p className="text-sm text-gray-600">
                        Navigate to a community you've joined, find the post creation box at the top of the feed, write
                        your content, optionally add media, and click "Post".
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">How do I create an event?</h3>
                      <p className="text-sm text-gray-600">
                        Go to the Events tab in any community and click "Create Event". Fill out the event details
                        including title, date, location, and description.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">How do I update my profile?</h3>
                      <p className="text-sm text-gray-600">
                        Click on your profile picture in the top right, select "Profile", then click the edit button to
                        update your information.
                      </p>
                    </div>

                    <div className="pt-4">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 w-full">
                        Contact Support
                      </button>
                    </div>
                  </div>
                )}

                {modalContent === "createCommunity" && (
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Community Name*</label>
                      <input
                        type="text"
                        placeholder="e.g., Photography Club"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Description*</label>
                      <textarea
                        placeholder="What is this community about?"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Community Image</label>
                      <div className="flex items-center">
                        <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center">
                          <Plus className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <button type="button" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                            Upload Image
                          </button>
                          <p className="text-xs text-gray-500 mt-1">Recommended: 400x400px</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Privacy</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="privacy"
                            id="public"
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                            defaultChecked
                          />
                          <label htmlFor="public" className="ml-2 text-sm text-gray-700">
                            Public - Anyone can view and join
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="privacy"
                            id="restricted"
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                          />
                          <label htmlFor="restricted" className="ml-2 text-sm text-gray-700">
                            Restricted - Anyone can view, membership requires approval
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="privacy"
                            id="private"
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                          />
                          <label htmlFor="private" className="ml-2 text-sm text-gray-700">
                            Private - Only members can view content
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700"
                      >
                        Create Event
                      </button>
                    </div>
                  </form>
                )}

                {modalContent === "communitySettings" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Community Name</label>
                      <input
                        type="text"
                        defaultValue={activeCommunity.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        defaultValue={activeCommunity.description}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Community Image</label>
                      <div className="flex items-center">
                        <img
                          src={activeCommunity.image || "/placeholder.svg"}
                          alt={activeCommunity.name}
                          className="h-20 w-20 rounded-md object-cover"
                        />
                        <div className="ml-4">
                          <button type="button" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                            Change Image
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-3">Moderation Tools</h3>
                      <div className="space-y-2">
                        <button className="flex items-center text-gray-700 hover:text-gray-900">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Members
                        </button>
                        <button className="flex items-center text-gray-700 hover:text-gray-900">
                          <ShieldIcon className="h-4 w-4 mr-2" />
                          Community Guidelines
                        </button>
                        <button className="flex items-center text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Delete Community
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {modalContent === "logout" && (
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                      <LogOutIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Sign out of your account?</h3>
                    <p className="mt-2 text-sm text-gray-500">You can always sign back in at any time.</p>
                    <div className="mt-6 flex justify-center space-x-3">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// These are needed for the Lucide icons in the component
const Shield = ({ className }) => (
  <ShieldIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  />
)

const LogOut = ({ className }) => (
  <LogOutIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  />
)

const Trash = ({ className }) => (
  <TrashIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  />
)

export default CommunityHub

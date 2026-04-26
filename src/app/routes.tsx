import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { AuthScreen } from "./components/AuthScreen";
import { ResponsiveHome } from "./components/ResponsiveHome";
import { SearchScreen } from "./components/SearchScreen";
import { QuizTakingScreen } from "./components/QuizTakingScreen";
import { CreateQuizScreen } from "./components/CreateQuizScreen";
import { PrivateAccessScreen } from "./components/PrivateAccessScreen";
import { OfflineSharingScreen } from "./components/OfflineSharingScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { DownloadedQuizzesScreen } from "./components/DownloadedQuizzesScreen";
import { ShareQuizzesScreen } from "./components/ShareQuizzesScreen";
import { CommunityScreen } from "./components/CommunityScreen";
import { CommunityDetailScreen } from "./components/CommunityDetailScreen";
import { StudyRoomsScreen } from "./components/StudyRoomsScreen";
import { ResponsiveCreateNotebook } from "./components/ResponsiveCreateNotebook";
import { ResponsiveCreateQuiz } from "./components/ResponsiveCreateQuiz";
import { ResponsiveCreateStudyMaterial } from "./components/ResponsiveCreateStudyMaterial";
import { ResponsiveYourNotebook } from "./components/ResponsiveYourNotebook";
import { ResponsiveProfile } from "./components/ResponsiveProfile";
import { CommunityMaterialsScreen } from "./components/CommunityMaterialsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: ResponsiveHome },
      { path: "auth", Component: AuthScreen },
      { path: "home", Component: ResponsiveHome },
      { path: "search", Component: SearchScreen },
      { path: "quiz/:id", Component: QuizTakingScreen },
      { path: "create", Component: ResponsiveCreateNotebook },
      { path: "create-notebook", Component: ResponsiveCreateNotebook },
      { path: "create-quiz", Component: ResponsiveCreateQuiz },
      { path: "create-study-material", Component: ResponsiveCreateStudyMaterial },
      { path: "upload-material", Component: ResponsiveCreateQuiz },
      { path: "your-notebook", Component: ResponsiveYourNotebook },
      { path: "community-materials", Component: CommunityMaterialsScreen },
      { path: "private-access/:id", Component: PrivateAccessScreen },
      { path: "offline-sharing", Component: OfflineSharingScreen },
      { path: "profile", Component: ResponsiveProfile },
      { path: "downloaded", Component: DownloadedQuizzesScreen },
      { path: "share-quizzes", Component: ShareQuizzesScreen },
      { path: "community", Component: CommunityScreen },
      { path: "community/:id", Component: CommunityDetailScreen },
      { path: "community-rooms", Component: StudyRoomsScreen },
      { path: "create-room", Component: StudyRoomsScreen },
      { path: "ai-assistant", Component: CommunityScreen },
    ],
  },
]);

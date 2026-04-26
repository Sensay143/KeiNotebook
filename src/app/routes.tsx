import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { AuthScreen } from "./components/AuthScreen";
import { HomeScreen } from "./components/HomeScreen";
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
import { CreateNotebookScreen } from "./components/CreateNotebookScreen";
import { CreateStudyMaterialScreen } from "./components/CreateStudyMaterialScreen";
import { YourNotebookScreen } from "./components/YourNotebookScreen";
import { CommunityMaterialsScreen } from "./components/CommunityMaterialsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomeScreen },
      { path: "onboarding", Component: OnboardingScreen },
      { path: "auth", Component: AuthScreen },
      { path: "home", Component: HomeScreen },
      { path: "search", Component: SearchScreen },
      { path: "quiz/:id", Component: QuizTakingScreen },
      { path: "create", Component: CreateNotebookScreen },
      { path: "create-notebook", Component: CreateNotebookScreen },
      { path: "create-quiz", Component: CreateQuizScreen },
      { path: "create-study-material", Component: CreateStudyMaterialScreen },
      { path: "upload-material", Component: CreateQuizScreen },
      { path: "your-notebook", Component: YourNotebookScreen },
      { path: "community-materials", Component: CommunityMaterialsScreen },
      { path: "private-access/:id", Component: PrivateAccessScreen },
      { path: "offline-sharing", Component: OfflineSharingScreen },
      { path: "profile", Component: ProfileScreen },
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

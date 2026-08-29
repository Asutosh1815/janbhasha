import React from 'react';
import { useApp } from '../../context/AppContext';
import { BottomNav } from './BottomNav';
import { AppDrawer } from './AppDrawer';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { LanguageSelectScreen } from '../screens/LanguageSelectScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { VoiceTranslationScreen } from '../screens/VoiceTranslationScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { WorksheetsScreen } from '../screens/WorksheetsScreen';
import { AssessmentsScreen } from '../screens/AssessmentsScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AdminDashboardScreen } from '../screens/AdminDashboardScreen';

export const AppShell: React.FC = () => {
  const { currentScreen } = useApp();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'language-select':
        return <LanguageSelectScreen />;
      case 'home':
        return <HomeScreen />;
      case 'admin-dashboard':
        return <AdminDashboardScreen />;
      case 'voice-translation':
        return <VoiceTranslationScreen />;
      case 'lessons':
        return <LessonScreen />;
      case 'worksheets':
        return <WorksheetsScreen />;
      case 'assessments':
        return <AssessmentsScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Hide bottom navigation on Splash and Login screens
  const hideBottomNav = currentScreen === 'splash' || currentScreen === 'login';

  return (
    <div className="w-full min-h-[100dvh] bg-[#fbfdf8] flex justify-center">
      {/* Main Responsive Mobile Viewport Container */}
      <div className="w-full max-w-md min-h-[100dvh] bg-[#fbfdf8] flex flex-col relative sm:border-x sm:border-slate-200/80 sm:shadow-sm">
        {/* Active Screen View */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {renderActiveScreen()}
          <AppDrawer />
        </main>

        {/* Bottom App Navigation */}
        {!hideBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

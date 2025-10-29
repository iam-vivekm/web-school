import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../client/src/lib/queryClient";
import { Toaster } from "../client/src/components/ui/toaster";
import { TooltipProvider } from "../client/src/components/ui/tooltip";
import { ThemeProvider } from "../client/src/components/ThemeProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EduManage Pro',
  description: 'School Management System',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ThemeProvider>
              {children}
              <Toaster />
            </ThemeProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { QueryProvider } from "@/src/providers/QueryProvider";
import {
  Modal,
  DAppBottomSheet,
  ErrorBoundaryWrapper,
} from "@/src/components/molecules";
import { isValidLocale } from "@/src/constants/locales";
import "../globals.css";
import { ReactNode } from "react";

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased bg-white">
        <ErrorBoundaryWrapper>
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              <div className="min-h-screen max-w-[759px] mx-auto bg-white shadow-xl">
                {children}
              </div>
              <Modal />
              <DAppBottomSheet />
            </NextIntlClientProvider>
          </QueryProvider>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}

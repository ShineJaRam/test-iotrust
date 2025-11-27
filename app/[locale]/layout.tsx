import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { Modal } from "@/src/components/Modal";
import { DAppBottomSheet } from "@/src/components/DAppBottomSheet";
import { QueryProvider } from "@/src/providers/QueryProvider";
import "../globals.css";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ko")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased bg-white">
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen max-w-[759px] mx-auto bg-white shadow-xl">
              {children}
            </div>
            <Modal />
            <DAppBottomSheet />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

import './globals.css';

export const metadata = {
  title: 'Prius Mahagedara | Premium Automotive',
  description: 'High-end automotive marketplace for premium and luxury vehicles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

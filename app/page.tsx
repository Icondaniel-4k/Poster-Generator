import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Users } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Design',
      description: 'Leverage advanced AI to create stunning campaign posters instantly',
    },
    {
      icon: Zap,
      title: 'Multiple Styles',
      description: 'Choose from modern, community, bold, or professional designs',
    },
    {
      icon: Users,
      title: 'Candidate Ready',
      description: 'Perfect for local elections, campaigns, and community initiatives',
    },
  ];

  const examplePosters = [
    {
      src: '/poster-1.jpg',
      alt: 'Modern professional campaign poster example',
    },
    {
      src: '/poster-2.jpg',
      alt: 'Community-focused campaign poster example',
    },
    {
      src: '/poster-3.jpg',
      alt: 'Bold campaign poster example',
    },
    {
      src: '/poster-4.jpg',
      alt: 'Professional minimalist campaign poster example',
    },
  ];

  return (
    <main className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent text-white font-bold">
              CP
            </div>
            <span className="font-semibold">Campaign Poster AI</span>
          </div>
          <Link href="/generator">
            <Button variant="default" className="gap-2">
              Launch App
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Create Professional Campaign Posters in Seconds
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Transform your campaign with AI-generated posters. Perfect for candidates, local
              initiatives, and community campaigns. No design experience needed.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/generator">
                <Button size="lg" className="w-full gap-2 gradient-accent text-white sm:w-auto">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-balance text-center text-3xl font-bold">Why Choose Campaign Poster AI?</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="rounded-lg border border-border/30 bg-card/50 p-6 animate-fade-in">
                  <div className="mb-4 inline-block rounded-lg bg-accent/10 p-3">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="border-t border-border/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold">Sample Campaign Posters</h2>
            <p className="mt-4 text-muted-foreground">
              See what you can create with our AI-powered platform
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {examplePosters.map((poster, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-border/30 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/20 animate-fade-in"
              >
                <div className="aspect-[3/4] overflow-hidden bg-card">
                  <img
                    src={poster.src}
                    alt={poster.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/generator">
              <Button size="lg" className="gap-2 gradient-accent text-white hover:shadow-lg hover:shadow-accent/30 transition-all duration-200">
                Create Your Posters Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="rounded-lg border border-border/30 gradient-subtle p-8 text-center sm:p-12">
            <h2 className="text-balance text-2xl font-bold sm:text-3xl">
              Ready to Launch Your Campaign?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join hundreds of campaigns using AI to create impactful posters.
            </p>
            <Link href="/generator" className="mt-8 inline-block">
              <Button size="lg" className="gap-2 gradient-accent text-white">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent text-white font-bold">
                CP
              </div>
              <span className="font-semibold">Campaign Poster AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Campaign Poster AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

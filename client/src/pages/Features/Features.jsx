import {
    Rocket,
    Link,
    Users,
    Palette,
    LayoutPanelTop,
    Search,
    BarChart2,
    Smartphone,
} from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: <Rocket className="h-6 w-6 text-white" />,
            title: 'Rapid Portfolio Creation',
            description:
                'Build your portfolio in no time with our user-friendly interface, allowing you to showcase your work effortlessly.',
        },
        {
            icon: <Link className="h-6 w-6 text-white" />,
            title: 'Instant Portfolio Links',
            description:
                'Get a live link to your portfolio within minutes, making it easy to share your achievements with potential clients and employers.',
        },
        {
            icon: <Users className="h-6 w-6 text-white" />,
            title: 'Collaborate with Talented Individuals',
            description:
                'Connect and collaborate with skilled professionals to enhance your projects and expand your network.',
        },
        {
            icon: <Palette className="h-6 w-6 text-white" />,
            title: 'Customizable Templates',
            description:
                'Choose from a variety of professional templates to create a unique and visually appealing portfolio that reflects your personal style.',
        },
        {
            icon: <LayoutPanelTop className="h-6 w-6 text-white" />,
            title: 'Integrated Project Management Tools',
            description:
                'Utilize built-in tools to manage your projects efficiently, track progress, and keep everything organized in one place.',
        },
        {
            icon: <Search className="h-6 w-6 text-white" />,
            title: 'SEO Optimization',
            description:
                'Optimize your portfolio for search engines to increase visibility and attract more opportunities.',
        },
        {
            icon: <BarChart2 className="h-6 w-6 text-white" />,
            title: 'Analytics Dashboard',
            description:
                "Monitor your portfolio's performance with insights on visitor traffic and engagement, helping you make informed improvements.",
        },
        {
            icon: <Smartphone className="h-6 w-6 text-white" />,
            title: 'Mobile-Friendly Design',
            description:
                'Ensure your portfolio looks great on all devices with responsive designs that adapt seamlessly to any screen size.',
        },
    ];

    return (
   
    <section className="w-full bg-[#09090B] py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-zinc-900 rounded-lg p-6 shadow-md hover:bg-zinc-800 hover:shadow-lg transition-shadow duration-300 h-full"

          >
            <div className="flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center text-white">{feature.title}</h3>
            <p className="text-gray-400 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
    );
}

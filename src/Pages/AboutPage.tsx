import Layout from "../layout/Layout";

export function AboutPage() {
  return (
 <Layout>
     <div className="max-w-4xl mx-auto py-20">
      <div className="border-l-4 border-orange-500 pl-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">About The Wire</h1>
      </div>

      <div className="prose prose-lg max-w-none space-y-6">
        <p className="text-xl text-gray-700 leading-relaxed">
          The Wire is a modern news platform dedicated to delivering accurate, timely, and comprehensive coverage of the stories that matter most.
        </p>

        <div className="bg-gray-50 border-l-4 border-orange-500 p-6 my-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-700">
            We believe in the power of quality journalism to inform, educate, and empower our readers. Our mission is to provide unbiased, well-researched news coverage across multiple categories including sports, politics, technology, and business.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-2 text-orange-500">Accuracy</h3>
            <p className="text-gray-600">Every story is thoroughly fact-checked and verified before publication.</p>
          </div>
          <div className="border-2 border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-2 text-orange-500">Independence</h3>
            <p className="text-gray-600">We maintain editorial independence and report without bias or external influence.</p>
          </div>
          <div className="border-2 border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-2 text-orange-500">Transparency</h3>
            <p className="text-gray-600">We're open about our sources, methods, and any potential conflicts of interest.</p>
          </div>
          <div className="border-2 border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-2 text-orange-500">Accessibility</h3>
            <p className="text-gray-600">Quality journalism should be accessible to everyone, everywhere.</p>
          </div>
        </div>

        <p className="text-gray-700 mt-8">
          Founded in 2026, The Wire has quickly become a trusted source for breaking news and in-depth analysis. Our team of experienced journalists and editors work around the clock to bring you the most important stories from around the world.
        </p>
      </div>
    </div>
 </Layout>
  );
}

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const HeroBuilder = () => {
  const [loading] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    subheading: '',
    ctaEnabled: true,
    ctaText: '',
    ctaLink: '',
    backgroundImage: ''
  });
  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // hook up to backend later
    toast.success('Hero section saved');
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Hero Section Builder</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              previewMode 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div 
            className="relative h-96 flex items-center justify-center text-white"
            style={{
              backgroundImage: formData.backgroundImage ? `url(${formData.backgroundImage})` : 'linear-gradient(135deg, #7af6ff 0%, #5ce6f0 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative text-center max-w-4xl mx-auto px-6">
              <h1 className="text-5xl font-bold mb-4">
                {formData.heading || 'Your Amazing Heading'}
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                {formData.subheading || 'Your compelling subheading goes here'}
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                {formData.ctaText || 'Call to Action'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Hero Content</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) => handleInputChange('heading', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your main heading"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subheading
                </label>
                <textarea
                  value={formData.subheading}
                  onChange={(e) => handleInputChange('subheading', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your subheading"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="ctaEnabled"
                  type="checkbox"
                  checked={!!formData.ctaEnabled}
                  onChange={(e) => handleInputChange('ctaEnabled', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="ctaEnabled" className="ml-2 block text-sm text-gray-700">Enable CTA</label>
              </div>

              {formData.ctaEnabled && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Call-to-Action Text
                    </label>
                    <input
                      type="text"
                      value={formData.ctaText}
                      onChange={(e) => handleInputChange('ctaText', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Get Started"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CTA Link
                    </label>
                    <input
                      type="text"
                      value={formData.ctaLink}
                      onChange={(e) => handleInputChange('ctaLink', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="/contact or https://example.com"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Image URL
                </label>
                <input
                  type="url"
                  value={formData.backgroundImage}
                  onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/hero-bg.jpg"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Hero Section'}
              </button>
            </form>
          </div>

          {/* Live Preview */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Live Preview</h3>
            </div>
            <div 
              className="relative h-64 flex items-center justify-center text-white"
              style={{
                backgroundImage: formData.backgroundImage ? `url(${formData.backgroundImage})` : 'linear-gradient(135deg, #7af6ff 0%, #5ce6f0 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="relative text-center max-w-md mx-auto px-4">
                <h1 className="text-2xl font-bold mb-2">
                  {formData.heading || 'Your Amazing Heading'}
                </h1>
                <p className="text-sm mb-4 text-gray-200">
                  {formData.subheading || 'Your compelling subheading goes here'}
                </p>
                {formData.ctaEnabled && (
                  <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                    {formData.ctaText || 'Call to Action'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBuilder;

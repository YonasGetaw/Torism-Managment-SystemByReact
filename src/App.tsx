import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Camera, Info, Moon, Sun, Menu, X, ChevronUp, Filter } from 'lucide-react';

interface Attraction {
  id: string;
  name: string;
  region: string;
  description: string;
  image: string;
  type: 'Nature' | 'Historical' | 'Religious' | 'Cultural';
  mapLink: string;
}

interface Festival {
  id: string;
  name: string;
  date: string;
  description: string;
  image: string;
  region: string;
}

const attractions: Attraction[] = [
  // Addis Ababa
  { id: '1', name: 'Unity Park', region: 'Addis Ababa', description: 'A beautiful park symbolizing Ethiopian unity with gardens, zoo, and cultural exhibitions.', image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Cultural', mapLink: 'https://maps.google.com/?q=Unity+Park+Addis+Ababa' },
  { id: '2', name: 'Entoto Park', region: 'Addis Ababa', description: 'Historic mountain offering panoramic views of the capital city.', image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Entoto+Park+Addis+Ababa' },
  { id: '3', name: 'National Museum', region: 'Addis Ababa', description: 'Home to Lucy, the famous 3.2 million-year-old hominid fossil.', image: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Historical', mapLink: 'https://maps.google.com/?q=National+Museum+Addis+Ababa' },
  { id: '4', name: 'Holy Trinity Cathedral', region: 'Addis Ababa', description: 'Beautiful Orthodox church with stunning architecture and religious significance.', image: 'https://images.pexels.com/photos/1329296/pexels-photo-1329296.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Religious', mapLink: 'https://maps.google.com/?q=Holy+Trinity+Cathedral+Addis+Ababa' },
  { id: '5', name: 'Meskel Square', region: 'Addis Ababa', description: 'Central square hosting major celebrations and cultural events.', image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Cultural', mapLink: 'https://maps.google.com/?q=Meskel+Square+Addis+Ababa' },
  
  // Amhara
  { id: '6', name: 'Lalibela Rock Churches', region: 'Amhara', description: 'UNESCO World Heritage site with 11 medieval churches carved from solid rock.', image: 'https://images.pexels.com/photos/1178249/pexels-photo-1178249.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Religious', mapLink: 'https://maps.google.com/?q=Lalibela+Rock+Churches' },
  { id: '7', name: 'Bahir Dar', region: 'Amhara', description: 'Charming lakeside city on Lake Tana with beautiful beaches and boat trips.', image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Bahir+Dar+Ethiopia' },
  { id: '8', name: 'Lake Tana Monasteries', region: 'Amhara', description: 'Ancient monasteries on islands in Ethiopia\'s largest lake.', image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Religious', mapLink: 'https://maps.google.com/?q=Lake+Tana+Monasteries' },
  { id: '9', name: 'Gondar Castle', region: 'Amhara', description: 'Royal enclosure with medieval castles and palaces.', image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Historical', mapLink: 'https://maps.google.com/?q=Gondar+Castle+Ethiopia' },
  { id: '10', name: 'Simien Mountains', region: 'Amhara', description: 'UNESCO World Heritage site with dramatic landscapes and endemic wildlife.', image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Simien+Mountains+Ethiopia' },
  
  // Tigray
  { id: '11', name: 'Axum Obelisks', region: 'Tigray', description: 'Ancient obelisks marking the heart of the Aksumite Empire.', image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Historical', mapLink: 'https://maps.google.com/?q=Axum+Obelisks+Ethiopia' },
  { id: '12', name: 'Debre Damo', region: 'Tigray', description: 'Monastery accessible only by rope, perched on a cliff.', image: 'https://images.pexels.com/photos/1178249/pexels-photo-1178249.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Religious', mapLink: 'https://maps.google.com/?q=Debre+Damo+Ethiopia' },
  { id: '13', name: 'Gheralta Rock Churches', region: 'Tigray', description: 'Churches carved into vertical cliff faces with stunning views.', image: 'https://images.pexels.com/photos/1329296/pexels-photo-1329296.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Religious', mapLink: 'https://maps.google.com/?q=Gheralta+Rock+Churches' },
  { id: '14', name: 'Yeha Temple', region: 'Tigray', description: 'Ancient pre-Aksumite temple dating back to 700 BC.', image: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Historical', mapLink: 'https://maps.google.com/?q=Yeha+Temple+Ethiopia' },
  
  // Afar
  { id: '15', name: 'Danakil Depression', region: 'Afar', description: 'One of the lowest and hottest places on Earth with unique geological formations.', image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Danakil+Depression+Ethiopia' },
  { id: '16', name: 'Erta Ale Volcano', region: 'Afar', description: 'Active volcano with permanent lava lake, offering otherworldly experiences.', image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Erta+Ale+Volcano+Ethiopia' },
  { id: '17', name: 'Dallol Sulfur Springs', region: 'Afar', description: 'Colorful hydrothermal fields with salt formations and hot springs.', image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Dallol+Ethiopia' },
  
  // Oromia
  { id: '18', name: 'Bale Mountains', region: 'Oromia', description: 'High-altitude ecosystem with endemic wildlife and stunning landscapes.', image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Bale+Mountains+Ethiopia' },
  { id: '19', name: 'Sof Omar Cave', region: 'Oromia', description: 'Spectacular limestone cave system with underground rivers.', image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Sof+Omar+Cave+Ethiopia' },
  { id: '20', name: 'Wenchi Crater Lake', region: 'Oromia', description: 'Beautiful crater lake with islands and hot springs.', image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Wenchi+Crater+Lake+Ethiopia' },
  { id: '21', name: 'Lake Langano', region: 'Oromia', description: 'Popular recreational lake with resorts and water activities.', image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Lake+Langano+Ethiopia' },
  
  // SNNPR
  { id: '22', name: 'Omo Valley Tribes', region: 'SNNPR', description: 'Home to diverse indigenous tribes with rich cultural traditions.', image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Cultural', mapLink: 'https://maps.google.com/?q=Omo+Valley+Ethiopia' },
  { id: '23', name: 'Konso Village', region: 'SNNPR', description: 'UNESCO World Heritage cultural landscape with terraced agriculture.', image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Cultural', mapLink: 'https://maps.google.com/?q=Konso+Village+Ethiopia' },
  { id: '24', name: 'Lake Awassa', region: 'SNNPR', description: 'Beautiful lake with abundant birdlife and fish market.', image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Nature', mapLink: 'https://maps.google.com/?q=Lake+Awassa+Ethiopia' },
  
  // Harari
  { id: '25', name: 'Walled City of Harar', region: 'Harari', description: 'UNESCO World Heritage site, considered the fourth holiest city in Islam.', image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Historical', mapLink: 'https://maps.google.com/?q=Harar+Ethiopia' },
  { id: '26', name: 'Hyena Feeding', region: 'Harari', description: 'Unique tradition of feeding wild hyenas at night in Harar.', image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Cultural', mapLink: 'https://maps.google.com/?q=Hyena+Feeding+Harar' },
  
  // Dire Dawa
  { id: '27', name: 'Historic Train Station', region: 'Dire Dawa', description: 'Beautiful French colonial architecture and railway heritage.', image: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Historical', mapLink: 'https://maps.google.com/?q=Dire+Dawa+Train+Station' },
  { id: '28', name: 'Kafira Market', region: 'Dire Dawa', description: 'Bustling traditional market with local crafts and foods.', image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=500', type: 'Cultural', mapLink: 'https://maps.google.com/?q=Kafira+Market+Dire+Dawa' }
];

const festivals: Festival[] = [
  { id: '1', name: 'Timkat (Epiphany)', date: 'January 19', description: 'Celebration of the baptism of Jesus Christ with colorful processions and water blessings.', image: 'https://images.pexels.com/photos/1329296/pexels-photo-1329296.jpeg?auto=compress&cs=tinysrgb&w=500', region: 'Nationwide' },
  { id: '2', name: 'Meskel', date: 'September 27', description: 'Finding of the True Cross celebrated with bonfires and flowers.', image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=500', region: 'Nationwide' },
  { id: '3', name: 'Irreecha', date: 'October', description: 'Oromo thanksgiving festival celebrating the end of the rainy season.', image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=500', region: 'Oromia' },
  { id: '4', name: 'Coffee Ceremony', date: 'Year-round', description: 'Traditional Ethiopian coffee ceremony, a social and cultural ritual.', image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=500', region: 'Nationwide' }
];

const regions = [
  'Addis Ababa', 'Amhara', 'Tigray', 'Afar', 'Oromia', 'SNNPR', 'Sidama', 
  'South Ethiopia', 'Central Ethiopia', 'Southwest Ethiopia', 'Benishangul-Gumuz', 
  'Gambella', 'Somali Region', 'Harari', 'Dire Dawa'
];

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredAttractions = attractions.filter(attraction => {
    const regionMatch = selectedRegion === 'All' || attraction.region === selectedRegion;
    const typeMatch = selectedType === 'All' || attraction.type === selectedType;
    return regionMatch && typeMatch;
  });

  const Navigation = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">ET</span>
            </div>
            <span className="text-xl font-bold">Explore Ethiopia</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            {['home', 'regions', 'attractions', 'festivals', 'gallery', 'travel-tips', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`capitalize transition-colors ${
                  currentSection === section 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'hover:text-green-600'
                }`}
              >
                {section.replace('-', ' ')}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-2 pt-4">
              {['home', 'regions', 'attractions', 'festivals', 'gallery', 'travel-tips', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => {
                    setCurrentSection(section);
                    setMobileMenuOpen(false);
                  }}
                  className={`capitalize text-left py-2 transition-colors ${
                    currentSection === section 
                      ? 'text-green-600 font-semibold' 
                      : 'hover:text-green-600'
                  }`}
                >
                  {section.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Land of Origins
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-delayed">
            Explore Ethiopia's Rich Heritage & Natural Wonders
          </p>
          <button
            onClick={() => setCurrentSection('regions')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-fade-in-delayed-2"
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* Regions Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Discover 15 Unique Regions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {regions.slice(0, 8).map((region, index) => (
              <div
                key={region}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-white'
                }`}
                onClick={() => {
                  setSelectedRegion(region);
                  setCurrentSection('attractions');
                }}
              >
                <div className="w-full h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{region}</span>
                </div>
                <h3 className="font-semibold text-center">{region}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
                  {attractions.filter(a => a.region === region).length} attractions
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentSection('regions')}
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              View All Regions →
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">15</div>
              <div className="text-gray-600 dark:text-gray-300">Regions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">80+</div>
              <div className="text-gray-600 dark:text-gray-300">Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">9</div>
              <div className="text-gray-600 dark:text-gray-300">UNESCO Sites</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
              <div className="text-gray-600 dark:text-gray-300">Years of History</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const RegionsPage = () => (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Ethiopian Regions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region, index) => (
            <div
              key={region}
              className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
              }`}
              onClick={() => {
                setSelectedRegion(region);
                setCurrentSection('attractions');
              }}
            >
              <div className="h-48 bg-gradient-to-br from-green-400 via-blue-500 to-yellow-500 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">{region}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{region}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Discover the unique attractions and cultural heritage of {region}.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {attractions.filter(a => a.region === region).length} attractions
                  </span>
                  <span className="text-green-600 font-semibold">Explore →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AttractionsPage = () => (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          {selectedRegion === 'All' ? 'All Attractions' : `${selectedRegion} Attractions`}
        </h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="All">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="All">All Types</option>
            <option value="Nature">Nature</option>
            <option value="Historical">Historical</option>
            <option value="Religious">Religious</option>
            <option value="Cultural">Cultural</option>
          </select>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.map((attraction) => (
            <div
              key={attraction.id}
              className={`rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
              }`}
            >
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setSelectedAttraction(attraction)}
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{attraction.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    attraction.type === 'Nature' ? 'bg-green-100 text-green-800' :
                    attraction.type === 'Historical' ? 'bg-blue-100 text-blue-800' :
                    attraction.type === 'Religious' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {attraction.type}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {attraction.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{attraction.region}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedAttraction(attraction)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    <a
                      href={attraction.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <MapPin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FestivalsPage = () => (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Ethiopian Festivals & Events</h1>
        <div className="max-w-4xl mx-auto">
          {festivals.map((festival, index) => (
            <div
              key={festival.id}
              className={`mb-8 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
              }`}
            >
              <div className="md:flex">
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                />
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-600 font-semibold">{festival.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{festival.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {festival.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{festival.region}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const GalleryPage = () => (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Photo Gallery</h1>
        
        {/* Gallery Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="All">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="All">All Types</option>
            <option value="Nature">Nature</option>
            <option value="Historical">Historical</option>
            <option value="Religious">Religious</option>
            <option value="Cultural">Cultural</option>
          </select>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAttractions.map((attraction) => (
            <div
              key={attraction.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => setSelectedImage(attraction.image)}
            >
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold">{attraction.name}</h3>
                  <p className="text-sm">{attraction.region}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TravelTipsPage = () => (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Travel Tips</h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Best Time to Visit</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The best time to visit Ethiopia is during the dry season from October to June. 
              The weather is pleasant with minimal rainfall, making it ideal for sightseeing and outdoor activities.
            </p>
          </div>

          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Cultural Etiquette</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Dress modestly, especially when visiting religious sites</li>
              <li>• Remove shoes when entering churches and mosques</li>
              <li>• Greet with "Selam" (Hello) in Amharic</li>
              <li>• Respect local customs and traditions</li>
              <li>• Ask permission before photographing people</li>
            </ul>
          </div>

          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className="text-2xl font-bold mb-4 text-yellow-600">Essential Phrases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <div>
                <strong>Selam</strong> - Hello
              </div>
              <div>
                <strong>Ameseginalehu</strong> - Thank you
              </div>
              <div>
                <strong>Yikerta</strong> - Excuse me
              </div>
              <div>
                <strong>Dehna hun</strong> - Goodbye
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Safety Tips</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Stay hydrated and use sunscreen</li>
              <li>• Be aware of altitude sickness in highland areas</li>
              <li>• Use reputable tour guides for remote areas</li>
              <li>• Keep copies of important documents</li>
              <li>• Check current travel advisories</li>
            </ul>
          </div>

          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Currency & Money</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The Ethiopian Birr (ETB) is the local currency. Credit cards are accepted in major hotels and restaurants, 
              but it's advisable to carry cash for smaller establishments and markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
              <h2 className="text-2xl font-bold mb-6 text-green-600">Get in Touch</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    rows={4}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
              <h2 className="text-2xl font-bold mb-6 text-blue-600">Visit Ethiopia</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ethiopian Tourism Organization</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The official tourism organization promoting Ethiopia's rich cultural heritage and natural beauty.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Useful Links</h3>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• Ethiopian Airlines</li>
                    <li>• Visa Information</li>
                    <li>• Weather Updates</li>
                    <li>• Local Tour Operators</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Emergency Contacts</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Emergency: 911<br />
                    Tourist Police: +251-11-XXX-XXXX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage />;
      case 'regions':
        return <RegionsPage />;
      case 'attractions':
        return <AttractionsPage />;
      case 'festivals':
        return <FestivalsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'travel-tips':
        return <TravelTipsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <Navigation />
      {renderCurrentSection()}
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
      
      {/* Attraction Modal */}
      {selectedAttraction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="relative">
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedAttraction(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedAttraction.name}</h2>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  selectedAttraction.type === 'Nature' ? 'bg-green-100 text-green-800' :
                  selectedAttraction.type === 'Historical' ? 'bg-blue-100 text-blue-800' :
                  selectedAttraction.type === 'Religious' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedAttraction.type}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedAttraction.region}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedAttraction.description}</p>
              <div className="flex space-x-4">
                <a
                  href={selectedAttraction.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>View on Map</span>
                </a>
                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
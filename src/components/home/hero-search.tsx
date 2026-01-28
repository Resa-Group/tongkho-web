import { useState } from 'react';
import { cities, propertyTypes, priceRanges, areaRanges } from '@components/header/header-nav-data';

type SearchTab = 'sale' | 'rent' | 'project';

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<SearchTab>('sale');
  const [city, setCity] = useState('ha-noi');
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [areaRange, setAreaRange] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (city) params.set('city', city);
    if (propertyType) params.set('type', propertyType);
    if (priceRange) params.set('price', priceRange);
    if (areaRange) params.set('area', areaRange);

    const basePath = activeTab === 'project' ? '/du-an' : activeTab === 'rent' ? '/cho-thue' : '/mua-ban';
    window.location.href = `${basePath}?${params.toString()}`;
  };

  const tabs: { id: SearchTab; label: string }[] = [
    { id: 'sale', label: 'Mua bán' },
    { id: 'rent', label: 'Cho thuê' },
    { id: 'project', label: 'Dự Án' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white/90 text-primary-500 hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-4">
        {/* Main Search Row */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* City Select */}
          <div className="md:w-40">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-secondary-700"
            >
              {cities.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Keyword Input */}
          <div className="flex-1">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm theo địa chỉ, dự án, từ khóa..."
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-8 py-3 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
          >
            <span>Tìm kiếm</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Advanced Filters */}
        {activeTab !== 'project' && (
          <div className="flex flex-col md:flex-row gap-3 mt-3">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="flex-1 px-4 py-3 border border-secondary-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-secondary-600"
            >
              <option value="">Loại {activeTab === 'sale' ? 'mua bán' : 'cho thuê'}</option>
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="flex-1 px-4 py-3 border border-secondary-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-secondary-600"
            >
              <option value="">Khoảng giá</option>
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            <select
              value={areaRange}
              onChange={(e) => setAreaRange(e.target.value)}
              className="flex-1 px-4 py-3 border border-secondary-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-secondary-600"
            >
              <option value="">Diện tích</option>
              {areaRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
    </div>
  );
}

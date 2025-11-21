import React, { useState, useRef, useEffect } from "react";
import { X, Plus, ChevronDown } from "lucide-react";

/**
 * Single active filter pill with remove button
 */
function ActiveFilterPill({ filterKey, filterValue, onRemove }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/45 bg-emerald-500/15 text-emerald-200 backdrop-blur transition hover:bg-emerald-500/20"
      style={{ padding: "0.5rem 0.75rem" }}
    >
      <span className="text-sm">
        <span className="font-medium opacity-75">{filterKey}:</span>{" "}
        <span className="font-semibold">{filterValue}</span>
      </span>
      <button
        onClick={onRemove}
        aria-label={`Remove ${filterKey} filter`}
        className="rounded-full p-0.5 transition hover:bg-emerald-400/20"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/**
 * Dropdown menu for adding new filters
 */
function AddFilterDropdown({ availableFilters, onAddFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedCategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectValue = (category, value) => {
    onAddFilter(category, value);
    setIsOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white/90 backdrop-blur transition hover:border-white/25 hover:bg-white/10"
        style={{ padding: "0.5rem 1rem" }}
      >
        <Plus className="h-4 w-4" />
        <span className="text-sm font-medium">Add Filter</span>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-xl border border-white/15 bg-[#1b1e24] shadow-2xl backdrop-blur"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {!selectedCategory ? (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                Filter by
              </div>
              {Object.keys(availableFilters).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-white/90 transition hover:bg-white/10"
                >
                  <span className="capitalize">{category}</span>
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
              ))}
            </div>
          ) : (
            // Show values for selected category
            <div className="p-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className="mb-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/70 transition hover:bg-white/10"
              >
                <ChevronDown className="h-4 w-4 rotate-90" />
                <span>Back</span>
              </button>
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                {selectedCategory}
              </div>
              {availableFilters[selectedCategory].map((value) => (
                <button
                  key={value}
                  onClick={() => handleSelectValue(selectedCategory, value)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/90 transition hover:bg-white/10"
                >
                  {value}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Main FilterPill component
 * Manages active filters and provides UI for adding/removing them
 */
export default function FilterPill({ activeFilters, onFiltersChange, availableFilters }) {
  const handleAddFilter = (category, value) => {
    const newFilters = [...activeFilters, { key: category, value }];
    onFiltersChange(newFilters);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = activeFilters.filter((_, i) => i !== index);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    onFiltersChange([]);
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <AddFilterDropdown
        availableFilters={availableFilters}
        onAddFilter={handleAddFilter}
      />

      {activeFilters.map((filter, index) => (
        <ActiveFilterPill
          key={`${filter.key}-${filter.value}-${index}`}
          filterKey={filter.key}
          filterValue={filter.value}
          onRemove={() => handleRemoveFilter(index)}
        />
      ))}

      {activeFilters.length > 0 && (
        <button
          onClick={handleClearAll}
          className="inline-flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 backdrop-blur transition hover:bg-red-500/20"
          style={{ padding: "0.5rem 0.75rem" }}
        >
          <X className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">Clear All</span>
        </button>
      )}
    </div>
  );
}

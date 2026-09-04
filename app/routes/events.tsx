import type { MetaArgs } from "react-router";
import { Link } from "react-router";
import { Clock } from "lucide-react";
import { Section } from "~/components/ui/Section";
import { useAllArticles, useAllEvents } from "~/hooks/useApi";
import type { Article } from "~/types";

export function meta({}: MetaArgs) {
  return [
    { title: "Events Timeline - IEEE BNS" },
    {
      name: "description",
      content: "Discover our timeline of IEEE BNS events, workshops, and activities",
    },
  ];
}

// دالة مساعدة لاستخراج السنة
const getYear = (iso: string | undefined) =>
  iso ? new Date(iso).getFullYear().toString() : "TBA";

// دالة مساعدة لتنسيق التاريخ الكامل
const getFullDate = (iso: string | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

/**
 * مكون عنصر الخط الزمني (Timeline Item)
 */
function TimelineItem({ event }: { event: Article }) {
  const year = getYear(event.createdAt);
  const fullDate = getFullDate(event.createdAt);

  return (
    <div className="relative flex items-center justify-between w-full mb-16 md:mb-24 group">
      
      {/* 
        الدوائر الزرقاء (Nodes) 
        موضعة بشكل مطلق (absolute). في الشاشات الصغيرة تكون على اليسار، وفي الكبيرة في المنتصف.
      */}
      <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 ring-4 ring-white shadow-sm z-10 transition-transform duration-300 group-hover:scale-110">
        <div className="w-2.5 h-2.5 bg-white rounded-full" />
      </div>

      {/* 
        التصميم لشاشات الهاتف (Mobile Layout)
      */}
      <div className="flex flex-col md:hidden pl-16 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <Link to={`/article/${event.id}`} className="hover:text-blue-600 transition-colors">
            {event.title}
          </Link>
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          <span className="font-semibold text-blue-600">{event.categoryName}</span>
          {fullDate && ` • ${fullDate}`}
        </p>
        {event.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">
            {event.description}
          </p>
        )}
        {event.keywords && event.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {event.keywords.map((kw) => (
              <span key={kw} className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-600">
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 
        التصميم للشاشات الكبيرة (Desktop Layout)
      */}
      
      {/* الجانب الأيسر (العنوان) */}
      <div className="hidden md:flex w-[45%] justify-end text-right pr-12">
        <div className="flex flex-col items-end justify-center">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-snug">
            <Link to={`/article/${event.id}`} className="hover:text-blue-600 transition-colors">
              {event.title}
            </Link>
          </h2>
        </div>
      </div>

      {/* الجانب الأيمن (التفاصيل والوصف) */}
      <div className="hidden md:flex flex-col w-[45%] pl-12 text-left">
        <p className="text-base text-gray-600 leading-relaxed flex items-center flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold shadow-sm">{event.categoryName}</span>
          {fullDate && <span className="text-gray-500 text-sm font-medium">{fullDate}</span>}
        </p>
        
        {event.description && (
          <p className="text-base text-gray-600 mt-4 leading-relaxed line-clamp-4">
            {event.description}
          </p>
        )}

        {/* الكلمات المفتاحية (Keywords) */}
        {event.keywords && event.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {event.keywords.map((kw) => (
              <span key={kw} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default function EventsTimeline() {
  const { data: articles, isLoading: articlesLoading, error: articlesError } = useAllArticles();
  const { data: apiEvents, isLoading: eventsLoading, error: eventsError } = useAllEvents();

  const isLoading = articlesLoading || eventsLoading;
  const error = articlesError || eventsError;

  // 1. Articles filtered by categoryName = "Events"
  const articleEvents: Article[] = Array.isArray(articles)
    ? articles.filter((a) => a.categoryName === "Events")
    : [];

  // 2. Map ApiEvent → Article shape so TimelineItem works for both
  const mappedApiEvents: Article[] = Array.isArray(apiEvents)
    ? apiEvents.map((e: any) => ({
        id: undefined,
        title: e.name,
        description: "",
        keywords: e.keyWords ?? [],
        photo: "",
        categoryName: e.categoryName ?? "Event",   // direct field, not nested
        createdAt: e.startDate ?? e.createdAt,
        updatedAt: e.lastUpdatedAt ?? e.updatedAt,
      }))
    : [];

  // 3. Merge: articleEvents first, then apiEvents (no duplicates by title)
  const articleTitles = new Set(articleEvents.map((a) => a.title));
  const uniqueApiEvents = mappedApiEvents.filter((e) => !articleTitles.has(e.title));
  const allEvents: Article[] = [...articleEvents, ...uniqueApiEvents];

  // ترتيب الأحداث تنازلياً (الأحدث أولاً)
  const sortedEvents = [...allEvents].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <Section id="events-timeline" padding="xl" className="bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Journey & Events
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            A chronological look at our branch's history, upcoming workshops, and major milestones.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center gap-8 opacity-50">
            <div className="w-full h-24 bg-gray-100 rounded-lg animate-pulse" />
            <div className="w-full h-24 bg-gray-100 rounded-lg animate-pulse delay-75" />
            <div className="w-full h-24 bg-gray-100 rounded-lg animate-pulse delay-150" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16 text-red-500 font-medium">
            Failed to load events. Please try again later.
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && sortedEvents.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Clock className="w-14 h-14 mx-auto mb-4 opacity-40" />
            <p className="text-xl font-medium">No events yet</p>
          </div>
        )}

        {/* Timeline Container */}
        {!isLoading && !error && sortedEvents.length > 0 && (
          <div className="relative w-full max-w-4xl mx-auto mt-10">
            
            {/* الخط العمودي المركزي */}
            <div className="absolute left-[35px] md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 md:-translate-x-1/2 z-0" />

            {/* رسم الأحداث */}
            {sortedEvents.map((event, i) => (
              <TimelineItem
                key={event.id || i}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
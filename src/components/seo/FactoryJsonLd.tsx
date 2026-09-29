import { localizedUrl, SITE_URL } from "@/lib/seo";
import { factoryVideo } from "@/lib/factory-content";

// 车间页 /factory 的结构化数据:面包屑(BreadcrumbList,首页→车间页两级)+ 车间视频(VideoObject)
interface FactoryJsonLdProps {
  locale: string;
  // 面包屑里本页的短名(没有单独的短名字段,直接传 h1)
  pageName: string;
  homeLabel: string;
  videoName: string;
  videoDescription: string;
}

export function FactoryJsonLd({
  locale,
  pageName,
  homeLabel,
  videoName,
  videoDescription,
}: FactoryJsonLdProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: localizedUrl(locale, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: localizedUrl(locale, "/factory"),
      },
    ],
  };

  const videoData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: videoName,
    description: videoDescription,
    thumbnailUrl: `${SITE_URL}${factoryVideo.poster}`,
    contentUrl: `${SITE_URL}${factoryVideo.src}`,
    uploadDate: factoryVideo.uploadDate,
    duration: factoryVideo.durationIso,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoData) }}
      />
    </>
  );
}

// Partner/developer data for infinite scroll section
import type { ImageMetadata } from 'astro';

// Import partner logos
import mikgroupLogo from '@/assets/images/partners/mikgroup.webp';
import vinhomesLogo from '@/assets/images/partners/vinhomes.webp';
import novalandLogo from '@/assets/images/partners/novaland.webp';
import sungroupLogo from '@/assets/images/partners/sungroup.webp';
import hungthinhLogo from '@/assets/images/partners/hungthinhland.webp';
import masteriseLogo from '@/assets/images/partners/masterise.webp';

export interface Partner {
  id: string;
  name: string;
  slug: string;
  image: ImageMetadata;
}

export const partners: Partner[] = [
  {
    id: '1',
    name: 'MIKGroup Việt Nam',
    slug: 'mikgroup',
    image: mikgroupLogo,
  },
  {
    id: '2',
    name: 'Vinhomes',
    slug: 'vinhomes',
    image: vinhomesLogo,
  },
  {
    id: '3',
    name: 'Novaland Group',
    slug: 'novaland',
    image: novalandLogo,
  },
  {
    id: '4',
    name: 'Sun Group',
    slug: 'sungroup',
    image: sungroupLogo,
  },
  {
    id: '5',
    name: 'Hưng Thịnh Land',
    slug: 'hungthinhland',
    image: hungthinhLogo,
  },
  {
    id: '6',
    name: 'Masterise Homes',
    slug: 'masterise',
    image: masteriseLogo,
  },
];

import { Link, Text, View } from '@react-pdf/renderer';
import countries, { type LocaleData } from 'i18n-iso-countries';
import isoCountries_de from 'i18n-iso-countries/langs/de.json';
import isoCountries_en from 'i18n-iso-countries/langs/en.json';
import { useLocale, useTranslations } from 'next-intl';
import type { PropsWithChildren, ReactNode } from 'react';
import { notEmpty } from '../lib/util';
import { Headline } from './Headline';
import { EarthIcon } from './icons/EarthIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { MailIcon } from './icons/MailIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { Section } from './Section';
import { spacing } from './styles';
;

const isoCountries:Record<string,LocaleData> = {
  de: isoCountries_de,
  en: isoCountries_en,
};

function IconText({ icon, children }: PropsWithChildren<{ icon: ReactNode }>) {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', gap: spacing[3] }}>
      {icon}
      {children}
    </View>
  );
}

const socialIcons: Record<string, typeof LinkedinIcon> = {
  linkedin: LinkedinIcon,
};

function Socials({ resume }: { resume: ResumeSchema }) {
  return resume.basics?.profiles?.map((item, i) => {
    const Icon = item.network ? socialIcons[item.network?.toLowerCase()] : undefined;
    return Icon ? (
      <IconText key={i} icon={<Icon size={spacing[4]} />}>
        <Link src={item.url}>{item.network}</Link>
      </IconText>
    ) : (
      <Link key={i} src={item.url}>
        {item.network}
      </Link>
    );
  });
}

function Location({ resume }: { resume: ResumeSchema }) {
  const locale = useLocale();
  if (!resume.basics?.location) {
    return;
  }

  const { address, city, countryCode, postalCode, region } = resume.basics.location;
  const countryName = countryCode ? countries.getName(countryCode, locale) : undefined;
  const items = [address, [postalCode, city].join(' '), region, countryName].filter(notEmpty);

  if (items.length === 0) {
    return;
  }

  return (
    <IconText icon={<MapPinIcon size={spacing[4]} />}>
      {items.length > 2 ? (
        <View style={{ flexDirection: 'column' }}>
          {items.map((item, i) => (
            <Text key={i}>{item}</Text>
          ))}
        </View>
      ) : (
        <Text>{items.join(', ')}</Text>
      )}
    </IconText>
  );
}

export function ContactSection({ resume }: { resume: ResumeSchema }) {
  const t = useTranslations('ContactSection');
  const locale = useLocale();
  countries.registerLocale(isoCountries[locale] ?? isoCountries_de);
  return (
    <Section level={2}>
      <Headline level={2}>{t('title')}</Headline>
      <View style={{ gap: spacing[2] }}>
        <Location resume={resume} />
        <IconText icon={<MailIcon size={spacing[4]} />}>
          <Text>{resume.basics?.email}</Text>
        </IconText>
        <IconText icon={<PhoneIcon size={spacing[4]} />}>
          <Text>{resume.basics?.phone}</Text>
        </IconText>
        <IconText icon={<EarthIcon size={spacing[4]} />}>
          <Link src={resume.basics?.url}>{resume.basics?.url}</Link>
        </IconText>
        <Socials resume={resume} />
      </View>
    </Section>
  );
}

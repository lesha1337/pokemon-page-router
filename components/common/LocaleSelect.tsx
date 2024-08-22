import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/lib/hooks/useLocale";

export function LocaleSelect() {
  const { locale, locales, changeLocale } = useLocale();

  return (
    <Select value={locale} onValueChange={changeLocale}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder="Locale" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((l) => (
          <SelectItem key={l} value={l}>
            {l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LocaleSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="flex gap-3">
            {routing.locales.map((el) => (
                <button
                    key={el}
                    className={el === locale ? "underline" : "opacity-60"}
                    onClick={() => router.replace(pathname, { locale: el })}
                >
                    {el.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LocaleSwitcher;

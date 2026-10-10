"use client";
import { useTranslations } from "next-intl";

const page = () => {
    const t = useTranslations("About");

    return <div className="max-w-[1600px] mx-auto py-6 text-2xl">{t("text")}</div>;
};

export default page;

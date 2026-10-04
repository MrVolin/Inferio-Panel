import "../styles/app.css";
import "../styles/inferio-theme.css";
import { Check, Copy, LifeBuoy, QrCode, Send } from "lucide-react";
import { StrictMode, useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Atmosphere } from "../components/atmosphere";
import { ErrorBoundary } from "../components/error-boundary";
import { LangSwitch } from "../components/lang";
import { Bar, Button, Pill, QR, Ring, Skeleton } from "../components/ui";
import { initI18n, t, useLocale } from "../i18n";
import { subDicts } from "../i18n/sub";
import { bytes, dateLong, dateShort, days, daysUntil } from "../lib/format";
import { safeHref } from "../lib/url";
import { APPS, detect, enc, type Platform } from "./apps";
import { Devices } from "./devices";
import { initData, json, openOutside, outside, pageURL, request, subRoot, tgEvent, tgMode, tokenOf } from "./net";
import { loadShop, Shop, type ShopData } from "./shop";
import { PromoSection } from "./promo";
import type { Info, TgSub } from "./types";

/** Pauses between the reloads after a payment: the panel applies a paid one within seconds. */

import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type appearance_details = {
    appearance_id: Generated<number>;
    game_id: string;
    entry_id: number;
    location: string;
    image: string | null;
    category: string;
    dlc: string | null;
    category_id: number | null;
};
export type categories = {
    id: Generated<number>;
    category: string;
    long_name: string | null;
};
export type entries = {
    title: string;
    headline: string | null;
    url: string;
    content: string | null;
    fallback_image: string | null;
    entry_id: Generated<number>;
};
export type games = {
    game_id: string;
    name: string | null;
    shortname: string | null;
};
export type raw = {
    id: string;
    title: string | null;
    headline: string | null;
    url: string | null;
    appearances: string | null;
    fallback_image: string | null;
    content: string | null;
    appears_in_dao: boolean | null;
    dao_location: string | null;
    dao_image: string | null;
    dao_section: string | null;
    dao_dlc: string | null;
    appears_in_da2: boolean | null;
    da2_location: string | null;
    da2_image: string | null;
    da2_section: string | null;
    da2_dlc: string | null;
    appears_in_dai: boolean | null;
    dai_location: string | null;
    dai_image: string | null;
    dai_section: string | null;
    dai_dlc: string | null;
};
export type DB = {
    appearance_details: appearance_details;
    categories: categories;
    entries: entries;
    games: games;
    raw: raw;
};

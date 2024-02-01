import { Image } from "./mainProducts.Image";
import { Option } from "./mainProducts.Option";
import { Variant } from "./mainProducts.variants";

export interface ProductElement {
    id:                   number;
    title:                string;
    body_html:            string;
    vendor:               string;
    product_type:         string;
    created_at:           string;
    handle:               string;
    updated_at:           string;
    published_at:         string;
    template_suffix:      string;
    published_scope:      string;
    tags:                 string;
    status:               string;
    admin_graphql_api_id: string;
    variants:             Variant[];
    options:              Option[];
    images:               Image[];
    image:                Image;
}
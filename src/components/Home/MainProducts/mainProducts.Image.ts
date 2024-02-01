export interface Image {
    id:                   number;
    alt:                  null;
    position:             number;
    product_id:           number;
    created_at:           string;
    updated_at:           string;
    admin_graphql_api_id: string;
    width:                number;
    height:               number;
    src:                  string;
    variant_ids:          any[];
}
import pandas as pd
from collections import Counter

def normalise_brands(data):

    # Convert data into a DataFrame
    df = pd.DataFrame(data)

    # Normalize brand names (removes trailing spaces and makes lowercase for comparison)
    def normalize_brand(brand):
        return brand.strip().lower()

    # Count occurrences of each normalized brand
    brand_counts = Counter(normalize_brand(brand) for brand in df["Brand"])

    # Map each normalized brand to the most common original form
    brand_mapping = {}
    for normalized_brand in brand_counts:
        original_forms = [brand for brand in df["Brand"] if normalize_brand(brand) == normalized_brand]
        most_common_form = Counter(original_forms).most_common(1)[0][0]
        brand_mapping[normalized_brand] = most_common_form

    # Explicitly handle specific cases
    brand_mapping['evo heat'] = 'Evo Heat'
    brand_mapping['evoheat'] = 'Evo Heat'

    # Apply the mapping to correct brand names in the DataFrame
    df["Brand"] = df["Brand"].apply(lambda brand: brand_mapping[normalize_brand(brand)])

    # Print corrected DataFrame
    print(df)

    # If needed, save to Excel
    df.to_excel('corrected_brands.xlsx', index=False)

    return df

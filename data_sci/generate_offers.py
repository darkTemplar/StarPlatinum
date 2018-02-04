import sys
import csv
import random
from math import ceil, floor


def read_listings_from_file(filename):
    """
    """
    listing_data = []
    with open(filename, newline='') as listing_file:
        listing_reader = csv.reader(listing_file, delimiter=',', quotechar='|')
        for line in listing_reader:
           list_price, target_price, p1, p2, p3 = line
           list_price, target_price, p1, p2, p3 = float(list_price), float(target_price), int(p1), int(p2), int(p3)
           listing_data.append([list_price, target_price, p1, p2, p3])
    return listing_data



def generate_random_offer(list_price):
    offer = {'list_price': list_price}
    price_fluctuation = random.uniform(-0.3, 0.3)
    escrow_fluctuation = random.uniform(-0.3, 0.3)
    # financing (vars)
    offer['offer_price'] = ceil((1 + price_fluctuation) * list_price) # round off to nearest int
    offer['all_cash'] = random.randint(0, 1) # boolean
    offer['proportion_down_payment'] = random.random() # percentage between 0 and 1
    offer['financing_contingency'] = random.randint(0, 1) # boolean
    offer['appraisal_contingency'] = random.randint(0, 1) # boolean

    # financing terms (do we need more variables)
    offer['preapproved_loan'] = random.randint(0, 1) # boolean

    # escrow terms 
    offer['escrow_period'] = ceil(30 * (1 + escrow_fluctuation))  # days
    offer['pays_title_insurance'] = random.randint(0, 1) # boolean (buyer or seliler)
    offer['chooses_title_insurance'] = random.randint(0, 1) # boolean (buyer or seller)
    offer['pays_escrow_fees'] = random.randint(0, 1) # boolean (buyer or seller)
    offer['chooses_escrow_company'] = random.randint(0, 1) # boolean (buyer or seller)

    #property condition
    offer['property_as_is'] = random.randint(0, 1) # boolean
    offer['property_inspection_contingency'] = random.randint(0, 1) # boolean
    offer['pest_control'] = random.randint(0, 1) # boolean (buyer or seller pays)
    offer['repairs_payment'] = random.randint(0, 1) # (buyer or seller pays)
    # disclosures
    offer['num_disclosures_signed'] = random.randint(0, 5) # int
    
    # other terms
    offer['accept_liquid_damages'] = random.randint(0, 1) # boolean
    offer['pays_for_home_warranty'] = random.randint(0, 1) # boolean
    return offer

def write_offers(offers):
    with open('offers.csv', 'w') as csvfile:
        field_names = ['list_price', 'offer_price', 'all_cash', 'proportion_down_payment', 'financing_contingency', 'appraisal_contingency', 
                'preapproved_loan', 'escrow_period', 'pays_title_insurance', 'chooses_title_insurance', 'pays_escrow_fees', 'chooses_escrow_company',
                'property_as_is', 'property_inspection_contingency', 'pest_control', 'repairs_payment', 'num_disclosures_signed', 'accept_liquid_damages',
                'pays_for_home_warranty']
        
        writer = csv.DictWriter(csvfile, fieldnames=field_names)
        writer.writeheader()
        for offer in offers:
            writer.writerow(offer)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        listings_file = sys.argv[1]
        with open(listings_file) as f:
            list_prices = [int(line) for line in f.readlines()]
        offers = [generate_random_offer(list_price) for list_price in list_prices]
        write_offers(offers)
    else:
        print("Please provide a text file as input for list prices")

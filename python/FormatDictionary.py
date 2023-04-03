import math


def FormatDictionary(dictionary):
    if math.isnan(dictionary["anger"][0]):
        dictionary = {"anger": "nan"}
    else:
        for key, value in dictionary.items():
            dictionary[key] = value[0]

    print(dictionary)
    return dictionary

def FormatDictionary(dictionary):
    for key, value in dictionary.items():
        dictionary[key] = value[0]
    return dictionary

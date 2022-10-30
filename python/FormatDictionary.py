def FormatDictionary(dictionary):
    if dictionary["anger"] != "nan":
        for key, value in dictionary.items():
            dictionary[key] = value[0]
    print(dictionary)
    return dictionary

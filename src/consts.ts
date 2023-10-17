export const CITIES = [
  {
    Version: 1,
    Key: "215854",
    Type: "City",
    Rank: 31,
    LocalizedName: "Tel Aviv",
    Country: {
      ID: "IL",
      LocalizedName: "Israel"
    },
    AdministrativeArea: {
      ID: "TA",
      LocalizedName: "Tel Aviv"
    }
  },
  {
    Version: 1,
    Key: "3431644",
    Type: "City",
    Rank: 45,
    LocalizedName: "Telanaipura",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia"
    },
    AdministrativeArea: {
      ID: "JA",
      LocalizedName: "Jambi"
    }
  },
  {
    Version: 1,
    Key: "300558",
    Type: "City",
    Rank: 45,
    LocalizedName: "Telok Blangah New Town",
    Country: {
      ID: "SG",
      LocalizedName: "Singapore"
    },
    AdministrativeArea: {
      ID: "05",
      LocalizedName: "South West"
    }
  },
  {
    Version: 1,
    Key: "325876",
    Type: "City",
    Rank: 51,
    LocalizedName: "Telford",
    Country: {
      ID: "GB",
      LocalizedName: "United Kingdom"
    },
    AdministrativeArea: {
      ID: "TFW",
      LocalizedName: "Telford and Wrekin"
    }
  },
  {
    Version: 1,
    Key: "169072",
    Type: "City",
    Rank: 51,
    LocalizedName: "Telavi",
    Country: {
      ID: "GE",
      LocalizedName: "Georgia"
    },
    AdministrativeArea: {
      ID: "KA",
      LocalizedName: "Kakheti"
    }
  },
  {
    Version: 1,
    Key: "230611",
    Type: "City",
    Rank: 51,
    LocalizedName: "Telsiai",
    Country: {
      ID: "LT",
      LocalizedName: "Lithuania"
    },
    AdministrativeArea: {
      ID: "TE",
      LocalizedName: "Telšiai"
    }
  },
  {
    Version: 1,
    Key: "2723742",
    Type: "City",
    Rank: 55,
    LocalizedName: "Telégrafo",
    Country: {
      ID: "BR",
      LocalizedName: "Brazil"
    },
    AdministrativeArea: {
      ID: "PA",
      LocalizedName: "Pará"
    }
  },
  {
    Version: 1,
    Key: "186933",
    Type: "City",
    Rank: 55,
    LocalizedName: "Tela",
    Country: {
      ID: "HN",
      LocalizedName: "Honduras"
    },
    AdministrativeArea: {
      ID: "AT",
      LocalizedName: "Atlántida"
    }
  },
  {
    Version: 1,
    Key: "3453754",
    Type: "City",
    Rank: 55,
    LocalizedName: "Telaga Asih",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia"
    },
    AdministrativeArea: {
      ID: "JB",
      LocalizedName: "West Java"
    }
  },
  {
    Version: 1,
    Key: "3453755",
    Type: "City",
    Rank: 55,
    LocalizedName: "Telagamurni",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia"
    },
    AdministrativeArea: {
      ID: "JB",
      LocalizedName: "West Java"
    }
  }
]

export const CURRENT_WEATHER = [
  {
    LocalObservationDateTime: "2023-09-23T20:13:00+03:00",
    EpochTime: 1695489180,
    WeatherText: "Clear",
    WeatherIcon: 33,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: false,
    Temperature: {
      Metric: {
        Value: 29.3,
        Unit: "C",
        UnitType: 17
      },
      Imperial: {
        Value: 85,
        Unit: "F",
        UnitType: 18
      }
    },
    MobileLink:
      "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
  }
]

export const fiveForecastsDaily = {
  Headline: {
    EffectiveDate: "2023-09-24T02:00:00+03:00",
    EffectiveEpochDate: 1695510000,
    Severity: 7,
    Text: "Humid late Saturday night to Thursday afternoon",
    Category: "humidity",
    EndDate: "2023-09-28T20:00:00+03:00",
    EndEpochDate: 1695920400,
    MobileLink:
      "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
    Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
  },
  DailyForecasts: [
    {
      Date: "2023-09-23T07:00:00+03:00",
      EpochDate: 1695441600,
      Temperature: {
        Minimum: {
          Value: 76.0,
          Unit: "F",
          UnitType: 18
        },
        Maximum: {
          Value: 92.0,
          Unit: "F",
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 35,
        IconPhrase: "Partly cloudy",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
    },
    {
      Date: "2023-09-24T07:00:00+03:00",
      EpochDate: 1695528000,
      Temperature: {
        Minimum: {
          Value: 74.0,
          Unit: "F",
          UnitType: 18
        },
        Maximum: {
          Value: 88.0,
          Unit: "F",
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 34,
        IconPhrase: "Mostly clear",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
    },
    {
      Date: "2023-09-25T07:00:00+03:00",
      EpochDate: 1695614400,
      Temperature: {
        Minimum: {
          Value: 74.0,
          Unit: "F",
          UnitType: 18
        },
        Maximum: {
          Value: 88.0,
          Unit: "F",
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 35,
        IconPhrase: "Partly cloudy",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
    },
    {
      Date: "2023-09-26T07:00:00+03:00",
      EpochDate: 1695700800,
      Temperature: {
        Minimum: {
          Value: 74.0,
          Unit: "F",
          UnitType: 18
        },
        Maximum: {
          Value: 87.0,
          Unit: "F",
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 35,
        IconPhrase: "Partly cloudy",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
    },
    {
      Date: "2023-09-27T07:00:00+03:00",
      EpochDate: 1695787200,
      Temperature: {
        Minimum: {
          Value: 75.0,
          Unit: "F",
          UnitType: 18
        },
        Maximum: {
          Value: 87.0,
          Unit: "F",
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 36,
        IconPhrase: "Intermittent clouds",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
    }
  ]
}

export const apiKey = "y4zLiFqFMQ8AUBNiT4sZjAyH3aeGfOCA"

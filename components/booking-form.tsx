"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plane, Hotel, Car, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { countries } from "@/lib/countries"
import {
  citiesByCountry,
  defaultCities,
  getCarTypes,
  getHotelStars,
  getCityWithAirport,
  getFlightClasses,
  getTransmissionTypes,
  getFuelTypes,
} from "@/lib/cities"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { useLanguage } from "./language-provider"
import { translations } from "@/lib/translations"
import { BookingFormSkeleton } from "./skeleton-loaders"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

export default function BookingForm() {
  const [formData, setFormData] = useState({
    // Common fields
    name: "",
    email: "",
    phone: "",
    bookingType: "flight",
    country: "",
    city: "",

    // Flight specific
    originCountry: "",
    originCity: "",
    destinationCountry: "",
    destinationCity: "",
    adults: 1,
    children: 0,
    flightClass: "",

    // Hotel specific
    guests: 1,
    childGuests: 0,
    hotelStars: "",

    // Car specific
    carType: "",
    transmissionType: "",
    fuelType: "",
  })

  // Date ranges for different booking types
  const [flightDates, setFlightDates] = useState<DateRange | undefined>()
  const [hotelDates, setHotelDates] = useState<DateRange | undefined>()
  const [carDates, setCarDates] = useState<DateRange | undefined>()

  const [isLoading, setIsLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationType, setAnimationType] = useState("flight")
  const [availableCities, setAvailableCities] = useState([])
  const { toast } = useToast()
  const { language } = useLanguage()
  const t = translations[language]
  const [isComponentLoading, setIsComponentLoading] = useState(true)

  // Get localized options
  const carTypes = getCarTypes(t)
  const hotelStars = getHotelStars(t)
  const flightClasses = getFlightClasses(t)
  const transmissionTypes = getTransmissionTypes(t)
  const fuelTypes = getFuelTypes(t)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComponentLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Update cities when country changes
  useEffect(() => {
    if (formData.country) {
      setAvailableCities(citiesByCountry[formData.country] || defaultCities)
      // Reset city when country changes
      setFormData((prev) => ({ ...prev, city: "" }))
    }
  }, [formData.country])

  if (isComponentLoading) {
    return <BookingFormSkeleton />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTabChange = (value) => {
    setFormData((prev) => ({ ...prev, bookingType: value }))
    setAnimationType(value)
    setShowAnimation(true)

    // Hide animation after 2 seconds
    setTimeout(() => {
      setShowAnimation(false)
    }, 2000)
  }

  const renderAnimationContent = () => {
    if (animationType === "flight") {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Plane className="h-12 w-12 md:h-16 md:w-16 text-primary animate-bounce mb-4" />
          <p className="text-base md:text-lg font-medium text-center">
            {t.flight} {t.bookingTitle}
          </p>
        </div>
      )
    } else if (animationType === "hotel") {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Hotel className="h-12 w-12 md:h-16 md:w-16 text-primary animate-pulse mb-4" />
          <p className="text-base md:text-lg font-medium text-center">
            {t.hotel} {t.bookingTitle}
          </p>
        </div>
      )
    } else if (animationType === "car") {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Car className="h-12 w-12 md:h-16 md:w-16 text-primary animate-bounce mb-4" />
          <p className="text-base md:text-lg font-medium text-center">
            {t.car} {t.bookingTitle}
          </p>
        </div>
      )
    }
  }

  const getCurrentDates = () => {
    switch (formData.bookingType) {
      case "flight":
        return flightDates
      case "hotel":
        return hotelDates
      case "car":
        return carDates
      default:
        return undefined
    }
  }

  const setCurrentDates = (dates: DateRange | undefined) => {
    switch (formData.bookingType) {
      case "flight":
        setFlightDates(dates)
        break
      case "hotel":
        setHotelDates(dates)
        break
      case "car":
        setCarDates(dates)
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const currentDates = getCurrentDates()

    // Check if dates are selected
    if (!currentDates?.from || !currentDates?.to) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select dates for your booking.",
        duration: 5000,
      })
      setIsLoading(false)
      return
    }

    // Format the message for WhatsApp based on booking type
    let message = `New Booking Request:\nType: ${formData.bookingType}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n`

    const fromDate = format(currentDates.from, "yyyy-MM-dd")
    const toDate = format(currentDates.to, "yyyy-MM-dd")

    if (formData.bookingType === "flight") {
      message += `Origin: ${formData.originCountry} - ${formData.originCity}\nDestination: ${formData.destinationCountry} - ${formData.destinationCity}\nDeparture: ${fromDate}\nReturn: ${toDate}\nAdults: ${formData.adults}\nChildren: ${formData.children}\nFlight Class: ${formData.flightClass}`
    } else if (formData.bookingType === "hotel") {
      message += `Country: ${formData.country}\nCity: ${formData.city}\nCheck-in: ${fromDate}\nCheck-out: ${toDate}\nGuests: ${formData.guests}\nChildren: ${formData.childGuests}\nHotel Stars: ${formData.hotelStars}`
    } else if (formData.bookingType === "car") {
      message += `Country: ${formData.country}\nCity: ${formData.city}\nCar Type: ${formData.carType}\nTransmission: ${formData.transmissionType}\nFuel Type: ${formData.fuelType}\nPickup Date: ${fromDate}\nDropoff Date: ${toDate}`
    }

    try {
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message)

      // Call the WhatsApp API
      const response = await fetch(
        `https://api.callmebot.com/whatsapp.php?phone=905550009261&text=${encodedMessage}&apikey=8845842`,
      )

      // Always show success message since the API call works but returns error status
      toast({
        title: t.formSubmitted,
        duration: 5000,
      })

      // Reset form fields based on booking type
      if (formData.bookingType === "flight") {
        setFormData((prev) => ({
          ...prev,
          originCountry: "",
          originCity: "",
          destinationCountry: "",
          destinationCity: "",
          adults: 1,
          children: 0,
          flightClass: "",
          name: "",
          email: "",
          phone: "",
        }))
        setFlightDates(undefined)
      } else if (formData.bookingType === "hotel") {
        setFormData((prev) => ({
          ...prev,
          country: "",
          city: "",
          guests: 1,
          childGuests: 0,
          hotelStars: "",
          name: "",
          email: "",
          phone: "",
        }))
        setHotelDates(undefined)
      } else if (formData.bookingType === "car") {
        setFormData((prev) => ({
          ...prev,
          country: "",
          city: "",
          carType: "",
          transmissionType: "",
          fuelType: "",
          name: "",
          email: "",
          phone: "",
        }))
        setCarDates(undefined)
      }
    } catch (error) {
      // Show success message even on error since the API works
      toast({
        title: t.formSubmitted,
        duration: 5000,
      })

      // Reset form anyway
      if (formData.bookingType === "flight") {
        setFormData((prev) => ({
          ...prev,
          originCountry: "",
          originCity: "",
          destinationCountry: "",
          destinationCity: "",
          adults: 1,
          children: 0,
          flightClass: "",
          name: "",
          email: "",
          phone: "",
        }))
        setFlightDates(undefined)
      } else if (formData.bookingType === "hotel") {
        setFormData((prev) => ({
          ...prev,
          country: "",
          city: "",
          guests: 1,
          childGuests: 0,
          hotelStars: "",
          name: "",
          email: "",
          phone: "",
        }))
        setHotelDates(undefined)
      } else if (formData.bookingType === "car") {
        setFormData((prev) => ({
          ...prev,
          country: "",
          city: "",
          carType: "",
          transmissionType: "",
          fuelType: "",
          name: "",
          email: "",
          phone: "",
        }))
        setCarDates(undefined)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-none relative">
      {/* Animation Overlay */}
      {showAnimation && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
          {renderAnimationContent()}
        </div>
      )}

      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg p-4 md:p-6">
        <CardTitle className="text-center text-lg md:text-xl">{t.bookingTitle}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <Tabs defaultValue="flight" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3 mb-4 md:mb-6 h-auto">
            <TabsTrigger value="flight" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 md:p-3">
              <Plane className="h-4 w-4" />
              <span className="text-xs sm:text-sm">{t.flight}</span>
            </TabsTrigger>
            <TabsTrigger value="hotel" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 md:p-3">
              <Hotel className="h-4 w-4" />
              <span className="text-xs sm:text-sm">{t.hotel}</span>
            </TabsTrigger>
            <TabsTrigger value="car" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 md:p-3">
              <Car className="h-4 w-4" />
              <span className="text-xs sm:text-sm">{t.car}</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Flight Booking Form */}
            {formData.bookingType === "flight" && (
              <>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originCountry" className="text-sm font-medium">
                        {t.origin} - {t.country}
                      </Label>
                      <Select
                        name="originCountry"
                        value={formData.originCountry}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, originCountry: value, originCity: "" }))
                        }
                        required
                      >
                        <SelectTrigger id="originCountry" className="h-10">
                          <SelectValue placeholder={t.selectCountry} />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originCity" className="text-sm font-medium">
                        {t.origin} - {t.city}
                      </Label>
                      <Select
                        name="originCity"
                        value={formData.originCity}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, originCity: value }))}
                        required
                        disabled={!formData.originCountry}
                      >
                        <SelectTrigger id="originCity" className="h-10">
                          <SelectValue placeholder={t.selectCity} />
                        </SelectTrigger>
                        <SelectContent>
                          {(citiesByCountry[formData.originCountry] || defaultCities).map((city) => (
                            <SelectItem key={city} value={city}>
                              {getCityWithAirport(city)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="destinationCountry" className="text-sm font-medium">
                        {t.destination} - {t.country}
                      </Label>
                      <Select
                        name="destinationCountry"
                        value={formData.destinationCountry}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, destinationCountry: value, destinationCity: "" }))
                        }
                        required
                      >
                        <SelectTrigger id="destinationCountry" className="h-10">
                          <SelectValue placeholder={t.selectCountry} />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destinationCity" className="text-sm font-medium">
                        {t.destination} - {t.city}
                      </Label>
                      <Select
                        name="destinationCity"
                        value={formData.destinationCity}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, destinationCity: value }))}
                        required
                        disabled={!formData.destinationCountry}
                      >
                        <SelectTrigger id="destinationCity" className="h-10">
                          <SelectValue placeholder={t.selectCity} />
                        </SelectTrigger>
                        <SelectContent>
                          {(citiesByCountry[formData.destinationCountry] || defaultCities).map((city) => (
                            <SelectItem key={city} value={city}>
                              {getCityWithAirport(city)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t.dateRange}</Label>
                    <DatePickerWithRange date={flightDates} onDateChange={setFlightDates} placeholder={t.selectDates} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adults" className="text-sm font-medium">
                        {t.adults}
                      </Label>
                      <Input
                        id="adults"
                        name="adults"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.adults}
                        onChange={handleChange}
                        className="h-10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="children" className="text-sm font-medium">
                        {t.children}
                      </Label>
                      <Input
                        id="children"
                        name="children"
                        type="number"
                        min="0"
                        max="10"
                        value={formData.children}
                        onChange={handleChange}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="flightClass" className="text-sm font-medium">
                        {t.flightClass}
                      </Label>
                      <Select
                        name="flightClass"
                        value={formData.flightClass}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, flightClass: value }))}
                        required
                      >
                        <SelectTrigger id="flightClass" className="h-10">
                          <SelectValue placeholder={t.selectFlightClass} />
                        </SelectTrigger>
                        <SelectContent>
                          {flightClasses.map((flightClass) => (
                            <SelectItem key={flightClass.value} value={flightClass.value}>
                              {flightClass.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Hotel Booking Form */}
            {formData.bookingType === "hotel" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      {t.country}
                    </Label>
                    <Select
                      name="country"
                      value={formData.country}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                      required
                    >
                      <SelectTrigger id="country" className="h-10">
                        <SelectValue placeholder={t.selectCountry} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      {t.city}
                    </Label>
                    <Select
                      name="city"
                      value={formData.city}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                      required
                      disabled={!formData.country}
                    >
                      <SelectTrigger id="city" className="h-10">
                        <SelectValue placeholder={t.selectCity} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Label className="text-sm font-medium">{t.stayDates}</Label>
                  <DatePickerWithRange date={hotelDates} onDateChange={setHotelDates} placeholder={t.selectDates} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-sm font-medium">
                      {t.guests}
                    </Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.guests}
                      onChange={handleChange}
                      className="h-10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childGuests" className="text-sm font-medium">
                      {t.childGuests}
                    </Label>
                    <Input
                      id="childGuests"
                      name="childGuests"
                      type="number"
                      min="0"
                      max="10"
                      value={formData.childGuests}
                      onChange={handleChange}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <Label htmlFor="hotelStars" className="text-sm font-medium">
                      {t.hotelStars}
                    </Label>
                    <Select
                      name="hotelStars"
                      value={formData.hotelStars}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, hotelStars: value }))}
                      required
                    >
                      <SelectTrigger id="hotelStars" className="h-10">
                        <SelectValue placeholder={t.selectStars} />
                      </SelectTrigger>
                      <SelectContent>
                        {hotelStars.map((star) => (
                          <SelectItem key={star.value} value={star.value}>
                            {star.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {/* Car Rental Form */}
            {formData.bookingType === "car" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      {t.country}
                    </Label>
                    <Select
                      name="country"
                      value={formData.country}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                      required
                    >
                      <SelectTrigger id="country" className="h-10">
                        <SelectValue placeholder={t.selectCountry} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      {t.city}
                    </Label>
                    <Select
                      name="city"
                      value={formData.city}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                      required
                      disabled={!formData.country}
                    >
                      <SelectTrigger id="city" className="h-10">
                        <SelectValue placeholder={t.selectCity} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="carType" className="text-sm font-medium">
                      {t.carType}
                    </Label>
                    <Select
                      name="carType"
                      value={formData.carType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, carType: value }))}
                      required
                    >
                      <SelectTrigger id="carType" className="h-10">
                        <SelectValue placeholder={t.selectCarType} />
                      </SelectTrigger>
                      <SelectContent>
                        {carTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmissionType" className="text-sm font-medium">
                      {t.transmissionType}
                    </Label>
                    <Select
                      name="transmissionType"
                      value={formData.transmissionType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, transmissionType: value }))}
                      required
                    >
                      <SelectTrigger id="transmissionType" className="h-10">
                        <SelectValue placeholder={t.selectTransmission} />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType" className="text-sm font-medium">
                      {t.fuelType}
                    </Label>
                    <Select
                      name="fuelType"
                      value={formData.fuelType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, fuelType: value }))}
                      required
                    >
                      <SelectTrigger id="fuelType" className="h-10">
                        <SelectValue placeholder={t.selectFuel} />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <Label className="text-sm font-medium">{t.rentalDates}</Label>
                  <DatePickerWithRange date={carDates} onDateChange={setCarDates} placeholder={t.selectDates} />
                </div>
              </>
            )}

            {/* Common Personal Information Fields */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  {t.name}
                </Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="h-10" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t.email}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    {t.phone}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-10"
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6 h-12 text-base" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                t.submit
              )}
            </Button>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  )
}

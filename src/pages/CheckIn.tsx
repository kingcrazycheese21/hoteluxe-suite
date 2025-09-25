import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Search } from "lucide-react";

export default function CheckIn() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const pendingCheckIns = [
    {
      id: "R001",
      confirmationNumber: "HT001234",
      guestName: "John Smith",
      room: "101",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-18",
      adults: 2,
      children: 0,
      roomType: "Deluxe King",
      status: "confirmed" as const
    },
    {
      id: "R002", 
      confirmationNumber: "HT001235",
      guestName: "Sarah Johnson",
      room: "205",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-20",
      adults: 1,
      children: 1,
      roomType: "Standard Queen",
      status: "pending" as const
    },
  ];

  const handleCheckIn = (reservation: any) => {
    toast({
      title: "Check-in Successful",
      description: `${reservation.guestName} has been checked into room ${reservation.room}`,
    });
  };

  const filteredReservations = pendingCheckIns.filter(reservation =>
    reservation.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reservation.confirmationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reservation.room.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <UserCheck className="h-8 w-8 text-primary" />
          Guest Check-In
        </h1>
        <p className="text-muted-foreground">
          Process guest arrivals and room assignments
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Search Reservations</CardTitle>
          <CardDescription>
            Find guests by name, confirmation number, or room number
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Guest name, confirmation number, or room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Expected Arrivals */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Expected Arrivals</CardTitle>
          <CardDescription>
            Guests scheduled to check in today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{reservation.guestName}</h3>
                      <StatusBadge variant={reservation.status}>
                        {reservation.status}
                      </StatusBadge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>
                        <strong>Confirmation:</strong> {reservation.confirmationNumber}
                      </div>
                      <div>
                        <strong>Room:</strong> {reservation.room}
                      </div>
                      <div>
                        <strong>Room Type:</strong> {reservation.roomType}
                      </div>
                      <div>
                        <strong>Guests:</strong> {reservation.adults} Adults, {reservation.children} Children
                      </div>
                      <div>
                        <strong>Check-in:</strong> {reservation.checkInDate}
                      </div>
                      <div>
                        <strong>Check-out:</strong> {reservation.checkOutDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={() => handleCheckIn(reservation)}
                      variant="default"
                      className="w-32"
                    >
                      Check In
                    </Button>
                    <Button variant="outline" className="w-32">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Check-in Form */}
      <Card>
        <CardHeader>
          <CardTitle>Walk-in Check-In</CardTitle>
          <CardDescription>
            Register guests without existing reservations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="walkInName">Guest Name</Label>
              <Input id="walkInName" placeholder="Enter guest name" />
            </div>
            <div>
              <Label htmlFor="walkInRoom">Room Number</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select available room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="102">Room 102 - Standard Queen</SelectItem>
                  <SelectItem value="105">Room 105 - Deluxe King</SelectItem>
                  <SelectItem value="203">Room 203 - Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="walkInAdults">Adults</Label>
              <Input id="walkInAdults" type="number" placeholder="Number of adults" />
            </div>
            <div>
              <Label htmlFor="walkInChildren">Children</Label>
              <Input id="walkInChildren" type="number" placeholder="Number of children" />
            </div>
          </div>
          <Button className="w-full">
            Process Walk-in Check-In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
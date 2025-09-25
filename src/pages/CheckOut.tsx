import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/hooks/use-toast";
import { UserX, Search, CreditCard, Receipt } from "lucide-react";

export default function CheckOut() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const currentGuests = [
    {
      id: "G001",
      guestName: "Mike Wilson",
      room: "312",
      checkInDate: "2024-01-12",
      checkOutDate: "2024-01-15",
      roomType: "Deluxe King",
      totalAmount: 450.00,
      outstanding: 0.00,
      status: "checkout" as const
    },
    {
      id: "G002",
      guestName: "Emily Davis",
      room: "108", 
      checkInDate: "2024-01-13",
      checkOutDate: "2024-01-15",
      roomType: "Standard Queen",
      totalAmount: 320.00,
      outstanding: 65.00,
      status: "occupied" as const
    },
  ];

  const handleCheckOut = (guest: any) => {
    toast({
      title: "Check-out Successful",
      description: `${guest.guestName} has been checked out of room ${guest.room}`,
    });
  };

  const filteredGuests = currentGuests.filter(guest =>
    guest.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.room.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <UserX className="h-8 w-8 text-primary" />
          Guest Check-Out
        </h1>
        <p className="text-muted-foreground">
          Process guest departures and room settlements
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Search Current Guests</CardTitle>
          <CardDescription>
            Find guests by name or room number
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
                  placeholder="Guest name or room number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Expected Departures */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Expected Departures</CardTitle>
          <CardDescription>
            Guests scheduled to check out today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGuests.map((guest) => (
              <div key={guest.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{guest.guestName}</h3>
                      <StatusBadge variant={guest.status}>
                        {guest.status}
                      </StatusBadge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>
                        <strong>Room:</strong> {guest.room}
                      </div>
                      <div>
                        <strong>Room Type:</strong> {guest.roomType}
                      </div>
                      <div>
                        <strong>Check-in:</strong> {guest.checkInDate}
                      </div>
                      <div>
                        <strong>Check-out:</strong> {guest.checkOutDate}
                      </div>
                      <div>
                        <strong>Total Amount:</strong> ${guest.totalAmount.toFixed(2)}
                      </div>
                      <div className={guest.outstanding > 0 ? "text-destructive font-semibold" : ""}>
                        <strong>Outstanding:</strong> ${guest.outstanding.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {guest.outstanding > 0 ? (
                      <Button variant="destructive" className="w-32">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Settle Bill
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleCheckOut(guest)}
                        variant="default"
                        className="w-32"
                      >
                        Check Out
                      </Button>
                    )}
                    <Button variant="outline" className="w-32">
                      <Receipt className="w-4 h-4 mr-2" />
                      View Bill
                    </Button>
                  </div>
                </div>

                {/* Bill Summary */}
                <div className="bg-muted p-3 rounded">
                  <h4 className="font-semibold mb-2">Bill Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Room Charges:</span>
                      <span>${(guest.totalAmount * 0.8).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Fees:</span>
                      <span>${(guest.totalAmount * 0.2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total:</span>
                      <span>${guest.totalAmount.toFixed(2)}</span>
                    </div>
                    {guest.outstanding > 0 && (
                      <div className="flex justify-between text-destructive font-semibold">
                        <span>Outstanding:</span>
                        <span>${guest.outstanding.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
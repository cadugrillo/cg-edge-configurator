package system

import (
	"net"
	"syscall"

	ni "github.com/hilt0n/netif"
)

type InterfaceSet struct {
	InterfacePath string    `json:"InterfacePath"`
	Adapters      []Adapter `json:"Adapters"`
}

type Adapter struct {
	AddrFamily int    `json:"AddrFamily"`
	AddrSource int    `json:"AddrSource"`
	Address    string `json:"Address"`
	Auto       bool   `json:"Auto"`
	Broadcast  string `json:"Broadcast"`
	Gateway    string `json:"Gateway"`
	Hotplug    bool   `json:"Hotplug"`
	Name       string `json:"Name"`
	Netmask    string `json:"Netmask"`
	Network    string `json:"Network"`
}

func GetNetworkInfo() *ni.InterfaceSet {
	is := ni.Parse(ni.Path("/etc/network/interfaces"))
	return is
}

func SetNetworkInfo(InterfaceSet InterfaceSet) string {

	is := ni.Parse(ni.Path("/etc/network/interfaces"))

	for i := 0; i < len(is.Adapters); i++ {

		switch InterfaceSet.Adapters[i].AddrSource {
		case 1:
			is.Adapters[i].AddrSource = ni.DHCP //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
		case 2:
			is.Adapters[i].AddrSource = ni.STATIC //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
		case 3:
			is.Adapters[i].AddrSource = ni.LOOPBACK //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
		case 4:
			is.Adapters[i].AddrSource = ni.MANUAL //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
		}

		is.Adapters[i].Address = net.ParseIP(InterfaceSet.Adapters[i].Address)
		is.Adapters[i].Netmask = net.ParseIP(InterfaceSet.Adapters[i].Netmask)
		is.Adapters[i].Gateway = net.ParseIP(InterfaceSet.Adapters[i].Gateway)

	}

	is.Write(ni.Path("/etc/network/interfaces"))
	return "Network Settings updated successfully! (You should restart the system to apply new settings)"

}

func RestartHost() string {
	syscall.Sync()
	err := syscall.Reboot(syscall.LINUX_REBOOT_CMD_RESTART)
	return err.Error()
}

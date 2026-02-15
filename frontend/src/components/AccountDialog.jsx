import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import api from "@/services/api"
import useAuthStore from "@/store/auth.store"
import { toast } from "sonner"

export default function AccountDialog({ open, setOpen }) {
  const user = useAuthStore((state) => state.user)

  const [form, setForm] = useState({
    fullName: "",
    email: ""
  })

  const [original, setOriginal] = useState({
    fullName: "",
    email: ""
  })

  useEffect(() => {
    if (user) {
      const data = {
        fullName: user.fullName || "",
        email: user.email || ""
      }
      setForm(data)
      setOriginal(data)
    }
  }, [user])

  const hasChanged =
    form.fullName !== original.fullName ||
    form.email !== original.email

  const handleUpdate = async () => {
    try {
      await api.put("/auth/update-profile", form)

      useAuthStore.setState({
        user: {
          ...user,
          fullName: form.fullName,
          email: form.email
        }
      })

      setOriginal(form)
      toast.success("Details updated successfully!",{position:"top-right"});
      setOpen(false)
    } catch (err) {
    toast.error("Something went Wrong!",{position:"top-right"});
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">

          <div>
            <label className="text-sm font-medium">Username</label>
            <Input value={user?.username || ""} disabled />
          </div>

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

        </div>

        <DialogFooter>
          <Button
            onClick={handleUpdate}
            disabled={!hasChanged}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
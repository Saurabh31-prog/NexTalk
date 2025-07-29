import { VideoIcon } from "lucide-react"

function CallButton ({ handleVideoCall})  {
  return (
    <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0"> 
      <button aria-placeholder="Video Call" onClick={handleVideoCall} className="btn btn-primary btn-sm text-white">
        
        <VideoIcon className="size-6" />
      </button>
    </div>
  )
}
export default CallButton;
import { X, Copy, Download } from 'lucide-react';

export default function PublishModal({
    isOpen,
    onClose,
    isPublished,
    setIsPublished,
    publishedUrl,
    previewUrl,
    qrCodeUrl,
    handleCopyUrl,
    handleDownloadQR,
    showCopyNotification,
    copiedUrl
}) {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-md relative border border-gray-600 dark:border-[#947198]">
                        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                            <X className="h-5 w-5" />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Publish and share your menu</h2>

                        {/* Status Message */}
                        <div
                            className={`p-4 rounded-lg mb-4 ${isPublished
                                    ? 'bg-green-50 text-green-700 dark:bg-green-600/25 dark:text-green-50'
                                    : 'bg-yellow-50 text-orange-700 dark:bg-red-500/25 dark:text-orange-100'
                                }`}
                        >
                            <div className="flex items-start">
                                {isPublished ? (
                                    <>
                                        <div className="flex-shrink-0">✓</div>
                                        <div className="ml-3">
                                            <p className="font-medium">Menu is published</p>
                                            <p className="mt-1 text-sm">
                                                Changes to the menu could take around 30 minutes to be reflected in the
                                                published menu page
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex-shrink-0">!</div>
                                        <div className="ml-3">
                                            <p className="font-medium">Menu is not published</p>
                                            <p className="mt-1 text-sm">
                                                Please publish the menu once you have finalized your changes. Once
                                                published, you will be able to either share the direct URL or the QR
                                                code for your menu with your customers
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Publish Toggle */}
                        <div className="flex items-center justify-between p-4 rounded-lg mb-4 bg-gray-100 dark:bg-fuchsia-300/15">
                            <span className="font-medium text-black dark:text-white">Publish Menu</span>
                            <button
                                onClick={() => setIsPublished(!isPublished)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isPublished ? 'bg-[#71389d] dark:bg-[#947198]' : 'bg-gray-300 dark:bg-[#b6a5b8]'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublished ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Published URL */}
                        {isPublished && (
                            <div className="mb-4">
                                <p className="text-sm font-medium mb-2 text-black dark:text-white">Published menu URL</p>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-fuchsia-300/15">
                                    <span className="text-sm truncate flex-1 text-black dark:text-white">
                                        <a href={publishedUrl} target="_blank" rel="noopener noreferrer">
                                            {publishedUrl}
                                        </a>
                                    </span>
                                    <div className="relative">
                                        <button onClick={() => handleCopyUrl(publishedUrl)} className="p-1 rounded text-black dark:text-white">
                                            <Copy className="h-4 w-4" />
                                        </button>
                                        {showCopyNotification && copiedUrl === publishedUrl && (
                                            <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-xs rounded py-1 px-2">
                                                URL copied!
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* QR Code */}
                        {isPublished && qrCodeUrl && (
                            <div className="mb-4">
                                <div className="flex justify-center mb-4">
                                    <img src={qrCodeUrl} alt="Menu QR Code" width={200} height={200} />
                                </div>
                                <button
                                    onClick={handleDownloadQR}
                                    className="w-full flex items-center justify-center gap-2 text-[#71389d] hover:text-[#4f276d] dark:text-[#d3a1d9] dark:hover:text-[#947198]"
                                >
                                    <Download className="h-4 w-4" />
                                    Download QR code
                                </button>
                            </div>
                        )}

                        {/* Preview URL */}
                        <div>
                            <p className="text-sm font-medium mb-2 text-black dark:text-white">Preview URL</p>
                            <p className="text-sm text-gray-500 mb-2">
                                The following URL can be used for testing purposes as it will mimic the interface of
                                actual menu while also updating in real time
                            </p>
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-fuchsia-300/15">
                                <span className="text-sm truncate flex-1 text-black dark:text-white">
                                    <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                                        {previewUrl}
                                    </a>
                                </span>
                                <div className="relative">
                                    <button onClick={() => handleCopyUrl(previewUrl)} className="p-1 hover:bg-gray-200 rounded">
                                        <Copy className="h-4 w-4 text-black dark:text-white" />
                                    </button>
                                    {showCopyNotification && copiedUrl === previewUrl && (
                                        <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-xs rounded py-1 px-2">
                                            URL copied!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}